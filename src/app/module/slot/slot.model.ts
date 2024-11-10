import { model, Schema, Types } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>(
  {
    room: {
      type: Schema.Types.ObjectId,
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
  },
  { versionKey: false }
);

export const Slot = model<TSlot>("Slot", slotSchema);
