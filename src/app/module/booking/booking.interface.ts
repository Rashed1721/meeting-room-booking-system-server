import { Types } from "mongoose";

export type TBooking = {
  userInfo: any;
  room: Types.ObjectId;
  slot: Types.ObjectId[];
  user: Types.ObjectId;
  date: string;
  paymentStatus?: "Pending" | "Paid" | "Failed";
  transanctionId?: string;
  totalAmount?: number;
  isConfirmed?: "confirmed" | "cancel" | "unconfirmed";
  isDeleted?: boolean;
};
