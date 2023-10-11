import express from "express";
import {
  createTask,
  deleteTask,
  populateTask,
  viewTask,
} from "../controller/todoController";

const todoRouter = express.Router();

todoRouter.route("/:authID/task").post(createTask);
todoRouter.route("/:authID/view").get(populateTask);
todoRouter.route("/:todoID/delete-task").delete(deleteTask);
todoRouter.route("/view-task").get(viewTask);

export default todoRouter;
