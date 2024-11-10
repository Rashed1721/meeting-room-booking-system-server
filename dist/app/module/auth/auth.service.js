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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    const res = {
        _id: result._id,
        name: result.name,
        email: result.email,
        phone: result.phone,
        role: result.role,
        address: result.address,
    };
    return res;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(payload === null || payload === void 0 ? void 0 : payload.email);
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
    };
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You Are Not Authorized!!");
    }
    const passwordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordMatch) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You Are Not Authorized!!");
    }
    const jwtpayload = {
        userId: user._id,
        role: user.role,
        email: user.email,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtpayload, config_1.default.jwt_access_secrect, {
        expiresIn: config_1.default.jwt_access_expires,
    });
    return { userData, accessToken };
});
exports.AuthServices = {
    login,
    signUp,
};
