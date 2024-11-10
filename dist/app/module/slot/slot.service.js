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
exports.SlotServices = void 0;
const slot_constant_1 = require("./slot.constant");
const slot_model_1 = require("./slot.model");
const createSlotIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, room, startTime, endTime, isBooked } = payload;
    let eachSlot = [];
    const slotDuration = 60;
    const endTimeInMin = (0, slot_constant_1.convertToMinutes)(endTime);
    const startTimeInMin = (0, slot_constant_1.convertToMinutes)(startTime);
    const TotalTime = endTimeInMin - startTimeInMin;
    const totalslot = TotalTime / slotDuration;
    for (let i = 0; i < totalslot; i++) {
        const startSlotInMin = startTimeInMin + i * 60;
        const endSlotInMin = startTimeInMin + (i + 1) * 60;
        eachSlot.push({
            room: room,
            date: date,
            startTime: (0, slot_constant_1.convertToTimeString)(startSlotInMin),
            endTime: (0, slot_constant_1.convertToTimeString)(endSlotInMin),
            isBooked: isBooked,
        });
    }
    const result = yield Promise.all(eachSlot.map((slot) => __awaiter(void 0, void 0, void 0, function* () {
        const createdSlot = yield slot_model_1.Slot.create(slot);
        return createdSlot;
    })));
    return result;
});
const getSingleSlotsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_model_1.Slot.findOne({});
    return result;
});
const getAllSlotFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = {
        date: query.date,
        room: query.roomId,
    };
    const finalQuery = (0, slot_constant_1.filterSearchQuery)(query, searchQuery);
    console.log(finalQuery);
    const result = yield slot_model_1.Slot.find(Object.assign({ isBooked: false }, finalQuery)).populate("room");
    return result;
});
const updateSlotgInDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield slot_model_1.Slot.findById(id);
    const result = yield slot_model_1.Slot.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteSlotInDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_model_1.Slot.findByIdAndDelete(id);
    return result;
});
exports.SlotServices = {
    createSlotIntoDb,
    getAllSlotFromDb,
    getSingleSlotsFromDb,
    updateSlotgInDb,
    deleteSlotInDb,
};
