"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "room is required"],
    },
    date: {
        type: String,
        required: [true, "date is required"],
    },
    startTime: {
        type: String,
        required: [true, "startTime is required"],
    },
    endTime: {
        type: String,
        required: [true, "endTime is required"],
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false });
exports.Slot = (0, mongoose_1.model)("Slot", slotSchema);
