"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamUpload = void 0;
const streamifier_1 = __importDefault(require("streamifier"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamUpload = (req) => {
    try {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const stream = yield cloudinary_1.default.uploader.upload_stream((result, err) => {
                if (result) {
                    return resolve(result);
                }
                else {
                    return reject(err);
                }
            });
            streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
        }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.streamUpload = streamUpload;
