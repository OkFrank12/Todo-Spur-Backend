import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./router/authRouter";
import todoRouter from "./router/todoRouter";

export const myAppConfig = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use("/api", authRouter);
  app.use("/api", todoRouter);
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Default route: Todo API is ready to deliver ✌️✌️✌️",
      });
    } catch (error: any) {
      return res.status(404).json({
        message: "error from Default route",
      });
    }
  });
};
