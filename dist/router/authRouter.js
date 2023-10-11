"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const multer_1 = require("../config/multer");
const authRouter = express_1.default.Router();
authRouter.route("/register").post(multer_1.upload, authController_1.registerAuth);
authRouter.route("/login").post(authController_1.signInAuth);
authRouter.route("/:authID/one").get(authController_1.viewOneAuth);
authRouter.route("/:authID/delete").delete(authController_1.deleteAuth);
authRouter.route("/all").get(authController_1.viewAllAuth);
exports.default = authRouter;
