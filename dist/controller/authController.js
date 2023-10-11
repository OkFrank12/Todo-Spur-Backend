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
exports.deleteAuth = exports.viewOneAuth = exports.viewAllAuth = exports.signInAuth = exports.registerAuth = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authModel_1 = __importDefault(require("../model/authModel"));
const registerAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const salted = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salted);
        const auth = yield authModel_1.default.create({
            userName,
            email,
            password: hashed,
        });
        return res.status(201).json({
            message: "Register Auth",
            data: auth,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error registering auth",
            data: error,
        });
    }
});
exports.registerAuth = registerAuth;
const signInAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const auth = yield authModel_1.default.findOne({ email });
        if (auth) {
            const checkPassword = yield bcrypt_1.default.compare(password, auth.password);
            if (checkPassword) {
                return res.status(201).json({
                    message: `Welcome to your Todo Space ${auth.userName}`,
                    data: auth,
                });
            }
            else {
                return res.status(404).json({
                    message: "Check your password",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Auth not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error signing in auth",
            data: error.message,
        });
    }
});
exports.signInAuth = signInAuth;
const viewAllAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield authModel_1.default.find();
        return res.status(200).json({
            message: "all auth found",
            data: all,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error viewing all auth",
            data: error.message,
        });
    }
});
exports.viewAllAuth = viewAllAuth;
const viewOneAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        return res.status(200).json({
            message: "viewing onee auth success",
            data: auth,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error viewing one auth",
            data: error.message,
        });
    }
});
exports.viewOneAuth = viewOneAuth;
const deleteAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID } = req.params;
        yield authModel_1.default.findByIdAndDelete(authID);
        return res.status(201).json({
            message: "Deleted ",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error deleting auth",
            data: error.message,
        });
    }
});
exports.deleteAuth = deleteAuth;
