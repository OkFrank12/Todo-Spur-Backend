"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConfig_1 = require("./config/mongoConfig");
const app_1 = require("./app");
const environment_1 = require("./config/environment");
const port = parseInt(environment_1.environment.PORT);
const app = (0, express_1.default)();
(0, app_1.myAppConfig)(app);
const server = app.listen(port, () => {
    (0, mongoConfig_1.dbConfig)();
});
server.on("uncaughtException", (error) => {
    console.log("uncaughtException", error);
    process.exit(1);
});
server.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
