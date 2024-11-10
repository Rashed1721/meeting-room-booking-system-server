"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createBookingValidationschema = zod_1.default.object({
    body: zod_1.default.object({
        room: zod_1.default.string({ required_error: "room is required" }),
        slot: zod_1.default.array(zod_1.default.string({ required_error: "slot is required" })),
        user: zod_1.default.string({ required_error: "user is required" }),
        date: zod_1.default.string({ required_error: "date is required" }),
        totalAmount: zod_1.default.number().optional(),
        isConfirmed: zod_1.default
            .enum(["confirmed", "unconfirmed", "cancel"])
            .optional(),
        isDeleted: zod_1.default.boolean().optional(),
    }),
});
const updateBookingValidationschema = zod_1.default.object({
    body: zod_1.default.object({
        room: zod_1.default.string({ required_error: "room is required" }).optional(),
        slot: zod_1.default.array(zod_1.default.string({ required_error: "slot is required" })).optional(),
        user: zod_1.default.string({ required_error: "user is required" }).optional(),
        date: zod_1.default.string({ required_error: "date is required" }).optional(),
        totalAmount: zod_1.default.number().optional(),
        isConfirmed: zod_1.default
            .enum(["confirmed", "unconfirmed", "cancel"])
            .optional(),
        isDeleted: zod_1.default.boolean().optional(),
    }),
});
exports.bookingValidations = {
    createBookingValidationschema,
    updateBookingValidationschema,
};
