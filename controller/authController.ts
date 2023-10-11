import { Request, Response } from "express";
import bcrypt from "bcrypt";
import authModel from "../model/authModel";
import cloudinary from "../config/cloudinary";

export const registerAuth = async (req: any, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const salted = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salted);

    const auth = await authModel.create({
      userName,
      email,
      password: hashed,
    });
    return res.status(201).json({
      message: "Register Auth",
      data: auth,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error registering auth",
      data: error,
    });
  }
};

export const signInAuth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const auth = await authModel.findOne({ email });
    if (auth) {
      const checkPassword = await bcrypt.compare(password, auth.password);
      if (checkPassword) {
        return res.status(201).json({
          message: `Welcome to your Todo Space ${auth.userName}`,
          data: auth,
        });
      } else {
        return res.status(404).json({
          message: "Check your password",
        });
      }
    } else {
      return res.status(404).json({
        message: "Auth not found",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "error signing in auth",
      data: error.message,
    });
  }
};

export const viewAllAuth = async (req: Request, res: Response) => {
  try {
    const all = await authModel.find();

    return res.status(200).json({
      message: "all auth found",
      data: all,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error viewing all auth",
      data: error.message,
    });
  }
};

export const viewOneAuth = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;
    const auth = await authModel.findById(authID);

    return res.status(200).json({
      message: "viewing onee auth success",
      data: auth,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error viewing one auth",
      data: error.message,
    });
  }
};

export const deleteAuth = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;

    await authModel.findByIdAndDelete(authID);

    return res.status(201).json({
      message: "Deleted ",
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error deleting auth",
      data: error.message,
    });
  }
};
