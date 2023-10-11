import express from "express";
import {
    deleteAuth,
  registerAuth,
  signInAuth,
  viewAllAuth,
  viewOneAuth,
} from "../controller/authController";
import { upload } from "../config/multer";

const authRouter = express.Router();

authRouter.route("/register").post(upload, registerAuth);
authRouter.route("/login").post(signInAuth);
authRouter.route("/:authID/one").get(viewOneAuth);
authRouter.route("/:authID/delete").delete(deleteAuth);
authRouter.route("/all").get(viewAllAuth);

export default authRouter;
