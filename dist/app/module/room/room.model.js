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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    roomNo: {
        type: Number,
        required: [true, "roomNo is Rrquired"],
        unique: true,
    },
    floorNo: {
        type: Number,
        required: [true, "floorNo is Rrquired"],
    },
    capacity: {
        type: Number,
        required: [true, "capacity is Rrquired"],
    },
    pricePerSlot: {
        type: Number,
        required: [true, "pricePerSlot is Rrquired"],
    },
    amenities: {
        type: [String],
        required: [true, "amenties is Rrquired"],
    },
    images: {
        type: [String],
        required: [true, "image is required"],
    },
    isDeleted: {
        type: Boolean,
        required: [true, "isDeleted is Rrquired"],
        default: false,
    },
}, { versionKey: false });
roomSchema.statics.isRoomExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.Room.findById(id);
    });
};
exports.Room = (0, mongoose_1.model)("Room", roomSchema);
