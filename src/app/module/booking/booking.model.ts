import { model, Schema, Types } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingschema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: [true, "date is required"],
    },
    slot: {
      type: [Schema.Types.ObjectId],
      required: [true, "slot is required"],
      ref: "Slot",
    },
    room: {
      type: Schema.Types.ObjectId,
      required: [true, "room is required"],
      ref: "Room",
    },
    user: {
      type: Schema.Types.ObjectId,
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
  },
  { versionKey: false }
);

export const Booking = model<TBooking>("Booking", bookingschema);
