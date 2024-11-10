import { Model, ObjectId, Types } from "mongoose";

export interface TRoom {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  images: string[];
  isDeleted: boolean;
}

export interface RoomModel extends Model<TRoom> {
  isRoomExists(id: string | Types.ObjectId): TRoom;
}
