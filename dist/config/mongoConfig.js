"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environment");
const mongoURL = environment_1.environment.MONGO;
const dbConfig = () => {
    mongoose_1.default.connect(mongoURL).then(() => {
        console.log(`database and server response is ready via ${mongoose_1.default.connection.host}`);
    });
};
exports.dbConfig = dbConfig;
