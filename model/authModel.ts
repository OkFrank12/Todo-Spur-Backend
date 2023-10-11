import mongoose from "mongoose";
import { iAuth, iAuthData } from "../utils/interface";

const authModel = new mongoose.Schema<iAuthData>(
  {
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
        type: mongoose.Types.ObjectId,
        ref: "tasks",
      },
    ],
    done: [
      {
        type: mongoose.Types.ObjectId,
        ref: "done",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iAuthData>("auths", authModel);
