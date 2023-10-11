"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.viewTask = exports.populateTask = exports.createTask = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todoModel_1 = __importDefault(require("../model/todoModel"));
const authModel_1 = __importDefault(require("../model/authModel"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID } = req.params;
        const { task, priority } = req.body;
        const creator = yield authModel_1.default.findById(authID);
        if (creator) {
            const todo = yield todoModel_1.default.create({
                task,
                priority,
                authID: creator === null || creator === void 0 ? void 0 : creator._id,
            });
            creator === null || creator === void 0 ? void 0 : creator.task.push(new mongoose_1.default.Types.ObjectId(todo === null || todo === void 0 ? void 0 : todo._id));
            creator === null || creator === void 0 ? void 0 : creator.save();
            return res.status(201).json({
                message: "Created Todo",
                data: todo,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating task",
            data: error.message,
        });
    }
});
exports.createTask = createTask;
const populateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID } = req.params;
        const todoPopulate = yield authModel_1.default.findById(authID).populate({
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
    }
    catch (error) {
        return res.status(404).json({
            message: "error populating task",
            data: error.message,
        });
    }
});
exports.populateTask = populateTask;
const viewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield todoModel_1.default.find();
        return res.status(200).json({
            message: "all task",
            data: all,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error viewing task",
            data: error.message,
        });
    }
});
exports.viewTask = viewTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoID } = req.params;
        yield todoModel_1.default.findByIdAndDelete(todoID);
        return res.status(201).json({
            message: "deleted task",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error deleted task",
            data: error.message,
        });
    }
});
exports.deleteTask = deleteTask;
