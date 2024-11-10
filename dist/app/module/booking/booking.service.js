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
exports.BookingServices = void 0;
const payment_utils_1 = require("../payment/payment.utils");
const room_model_1 = require("../room/room.model");
const booking_model_1 = require("./booking.model");
const createBookingIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const roomId = payload === null || payload === void 0 ? void 0 : payload.room;
    const room = yield room_model_1.Room.isRoomExists(roomId);
    const slotPrice = room === null || room === void 0 ? void 0 : room.pricePerSlot;
    const totalSlot = payload.slot.length;
    const totalAmount = totalSlot * slotPrice;
    const transactionId = `TXN-${Date.now()}`;
    payload.totalAmount = totalAmount;
    payload.transanctionId = transactionId;
    payload.isConfirmed = "unconfirmed";
    const result = (yield (yield (yield booking_model_1.Booking.create(payload)).populate("room")).populate("slot")).populate("user");
    //payment
    const paymentData = {
        transactionId,
        totalPrice: totalAmount,
        customerName: (_a = payload === null || payload === void 0 ? void 0 : payload.userInfo) === null || _a === void 0 ? void 0 : _a.name,
        customerEmail: (_b = payload === null || payload === void 0 ? void 0 : payload.userInfo) === null || _b === void 0 ? void 0 : _b.email,
        customerPhone: (_c = payload === null || payload === void 0 ? void 0 : payload.userInfo) === null || _c === void 0 ? void 0 : _c.phone,
        customerAddress: (_d = payload === null || payload === void 0 ? void 0 : payload.userInfo) === null || _d === void 0 ? void 0 : _d.address,
    };
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
    console.log(paymentSession);
    return paymentSession;
});
const getAllBookingFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find()
        .populate("slot")
        .populate("room")
        .populate("user");
    return result;
});
const getMyBookingFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    const result = yield booking_model_1.Booking.find({ user: userId })
        .populate("slot")
        .populate("room")
        .populate("user");
    return result;
});
const updateBookingInDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield booking_model_1.Booking.findById(id);
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteBookingInDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndDelete(id);
    return result;
});
exports.BookingServices = {
    createBookingIntoDb,
    getAllBookingFromDb,
    getMyBookingFromDb,
    updateBookingInDb,
    deleteBookingInDb,
};
