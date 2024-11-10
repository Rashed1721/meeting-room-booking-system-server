"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createRoomValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: "name is required" }),
        roomNo: zod_1.default.number({ required_error: "roomNois required" }),
        floorNo: zod_1.default.number({ required_error: "floorNo is required" }),
        capacity: zod_1.default.number({ required_error: "capacity is required" }),
        pricePerSlot: zod_1.default.number({ required_error: "pricePerSlot is required" }),
        amenities: zod_1.default.array(zod_1.default.string()),
        isDeleted: zod_1.default.boolean().optional(),
    }),
});
const updateRoomValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: "name is required" }).optional(),
        roomNo: zod_1.default.number({ required_error: "roomNois required" }).optional(),
        floorNo: zod_1.default.number({ required_error: "floorNo is required" }).optional(),
        capacity: zod_1.default.number({ required_error: "capacity is required" }).optional(),
        pricePerSlot: zod_1.default
            .number({ required_error: "pricePerSlot is required" })
            .optional(),
        amenities: zod_1.default.array(zod_1.default.string()).optional(),
        isDeleted: zod_1.default.boolean().optional(),
    }),
});
exports.roomValidations = {
    createRoomValidationSchema,
    updateRoomValidationSchema,
};
