"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authModel = new mongoose_1.default.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    task: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "tasks",
        },
    ],
    done: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "done",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("auths", authModel);
