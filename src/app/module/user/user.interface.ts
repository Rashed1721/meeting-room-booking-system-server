import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "user";
}

export type TUSER_ROLE = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser>;
}
