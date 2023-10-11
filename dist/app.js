"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myAppConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const todoRouter_1 = __importDefault(require("./router/todoRouter"));
const myAppConfig = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use("/api", authRouter_1.default);
    app.use("/api", todoRouter_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Default route: Todo API is ready to deliver ✌️✌️✌️",
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "error from Default route",
            });
        }
    });
};
exports.myAppConfig = myAppConfig;
