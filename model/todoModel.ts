import { iTodo, iTodoData } from "../utils/interface";
import mongoose from "mongoose";

const todoModel = new mongoose.Schema<iTodoData>(
  {
    task: {
      type: String,
    },
    priority: {
      type: String,
    },
    auth: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iTodoData>("tasks", todoModel);
