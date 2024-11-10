import { RoomModel, TRoom } from "./room.interface";
import { model, Schema } from "mongoose";

const roomSchema = new Schema<TRoom, RoomModel>(
  {
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
  },
  { versionKey: false }
);

roomSchema.statics.isRoomExists = async function (id: string) {
  return await Room.findById(id);
};

export const Room = model<TRoom, RoomModel>("Room", roomSchema);
