"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const todoRouter = express_1.default.Router();
todoRouter.route("/:authID/task").post(todoController_1.createTask);
todoRouter.route("/:authID/view").get(todoController_1.populateTask);
todoRouter.route("/:todoID/delete-task").delete(todoController_1.deleteTask);
todoRouter.route("/view-task").get(todoController_1.viewTask);
exports.default = todoRouter;
