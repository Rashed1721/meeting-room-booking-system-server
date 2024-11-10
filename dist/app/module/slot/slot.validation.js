"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createSlotValidationSchema = zod_1.default.object({
    body: zod_1.default
        .object({
        room: zod_1.default.string({ required_error: "room is required" }),
        date: zod_1.default
            .string({ required_error: "date is required" })
            .refine((date) => {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateRegex.test(date);
        }, {
            message: "Invalid date format  ,expected like this 'YY:MM:DD'  ",
        })
            .transform((date) => new Date(date)),
        startTime: zod_1.default.string({ required_error: "startTime is required" }).refine((time) => {
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(time);
        }, {
            message: "Invalid Time format , Follow  24 hour time format ,expected like this 'HH:MM'  ",
        }),
        endTime: zod_1.default.string({ required_error: "endTime is required" }).refine((time) => {
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(time);
        }, {
            message: "Invalid Time format , Follow  24 hour time format ,expected like this 'HH:MM'  ",
        }),
        isBooked: zod_1.default
            .boolean({ required_error: "isBooked is required" })
            .optional(),
    })
        .refine((body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}`);
        const endtTime = new Date(`1970-01-01T${body.endTime}`);
        return endtTime > startTime;
    }, {
        message: "start time should be before  end time",
    }),
});
exports.slotValidations = {
    createSlotValidationSchema,
};
