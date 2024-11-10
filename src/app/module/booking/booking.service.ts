import { initiatePayment } from "../payment/payment.utils";
import { TRoom } from "../room/room.interface";
import { Room } from "../room/room.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDb = async (payload: TBooking) => {
  const roomId = payload?.room;
  const room = await Room.isRoomExists(roomId);

  const slotPrice = room?.pricePerSlot;
  const totalSlot = payload.slot.length;

  const totalAmount = totalSlot * slotPrice;
  const transactionId = `TXN-${Date.now()}`;

  payload.totalAmount = totalAmount;
  payload.transanctionId = transactionId;
  payload.isConfirmed = "unconfirmed";

  const result = (
    await (
      await (await Booking.create(payload)).populate("room")
    ).populate("slot")
  ).populate("user");

  //payment
  const paymentData = {
    transactionId,
    totalPrice: totalAmount,
    customerName: payload?.userInfo?.name,
    customerEmail: payload?.userInfo?.email,
    customerPhone: payload?.userInfo?.phone,
    customerAddress: payload?.userInfo?.address,
  };
  const paymentSession = await initiatePayment(paymentData);
  console.log(paymentSession);

  return paymentSession;
};

const getAllBookingFromDb = async () => {
  const result = await Booking.find()
    .populate("slot")
    .populate("room")
    .populate("user");
  return result;
};
const getMyBookingFromDb = async (userId: string) => {
  console.log(userId);
  const result = await Booking.find({ user: userId })
    .populate("slot")
    .populate("room")
    .populate("user");
  return result;
};

const updateBookingInDb = async (id: string, payload: Partial<TBooking>) => {
  const data = await Booking.findById(id);
  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteBookingInDb = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

export const BookingServices = {
  createBookingIntoDb,
  getAllBookingFromDb,
  getMyBookingFromDb,
  updateBookingInDb,
  deleteBookingInDb,
};
