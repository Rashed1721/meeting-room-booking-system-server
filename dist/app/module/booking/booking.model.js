"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingschema = new mongoose_1.Schema({
    date: {
        type: String,
        required: [true, "date is required"],
    },
    slot: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: [true, "slot is required"],
        ref: "Slot",
    },
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "room is required"],
        ref: "Room",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref: "User",
    },
    isConfirmed: {
        type: String,
        enum: {
            values: ["confirmed", "unconfirmed", "cancel"],
            message: "{VALUE is not valid}",
        },
        default: "confirmed",
    },
    totalAmount: {
        type: Number,
    },
    transanctionId: {
        type: String,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false });
exports.Booking = (0, mongoose_1.model)("Booking", bookingschema);
