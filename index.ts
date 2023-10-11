import express, { Application } from "express";
import { dbConfig } from "./config/mongoConfig";
import { myAppConfig } from "./app";
import { environment } from "./config/environment";

const port: number = parseInt(environment.PORT!);

const app: Application = express();
myAppConfig(app);

const server = app.listen(process.env.PORT || port, () => {
  dbConfig();
});

server.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException", error);
  process.exit(1);
});

server.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
