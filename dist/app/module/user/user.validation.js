"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createUserschemaValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: "name is required" }),
        email: zod_1.default
            .string({ required_error: "email is required" })
            .email({ message: "email is not valid" }),
        password: zod_1.default.string({ required_error: "password is required" }),
        phone: zod_1.default.string({ required_error: "phone number is required" }),
        address: zod_1.default.string({ required_error: "address is required" }),
        role: zod_1.default.enum(["admin", "user"]),
    }),
});
exports.userValidations = {
    createUserschemaValidation,
};
