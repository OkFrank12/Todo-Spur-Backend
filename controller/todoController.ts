import { Request, Response } from "express";
import mongoose from "mongoose";
import todoModel from "../model/todoModel";
import authModel from "../model/authModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;
    const { task, priority } = req.body;
    const creator: any = await authModel.findById(authID);

    if (creator) {
      const todo = await todoModel.create({
        task,
        priority,
        authID: creator?._id,
      });

      creator?.task.push(new mongoose.Types.ObjectId(todo?._id));
      creator?.save();

      return res.status(201).json({
        message: "Created Todo",
        data: todo,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "error creating task",
      data: error.message,
    });
  }
};

export const populateTask = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;
    const todoPopulate = await authModel.findById(authID).populate({
      path: "task",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "Populate Task",
      data: todoPopulate,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error populating task",
      data: error.message,
    });
  }
};

export const viewTask = async (req: Request, res: Response) => {
  try {
    const all = await todoModel.find();

    return res.status(200).json({
      message: "all task",
      data: all,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error viewing task",
      data: error.message,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { todoID } = req.params;
    await todoModel.findByIdAndDelete(todoID);

    return res.status(201).json({
      message: "deleted task",
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error deleted task",
      data: error.message,
    });
  }
};
