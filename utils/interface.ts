import mongoose from "mongoose";

export interface iAuth {
  userName: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
  task: {}[];
  done: Array<{}>;
}

export interface iTodo {
  task: string;
  priority: string;
  auth: {};
}

export interface iAuthData extends iAuth, mongoose.Document {}
export interface iTodoData extends iTodo, mongoose.Document {}
