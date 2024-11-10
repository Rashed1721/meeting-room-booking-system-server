import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const signUp = async (payload: TUser) => {
  const result = await User.create(payload);

  const res = {
    _id: result._id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    role: result.role,
    address: result.address,
  };

  return res;
};

const login = async (payload: TLogin) => {
  const user = await User.isUserExists(payload?.email);

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
  };

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "You Are Not Authorized!!");
  }
  const passwordMatch = await bcrypt.compare(
    payload?.password,
    user?.password as string
  );
  if (!passwordMatch) {
    throw new AppError(httpStatus.NOT_FOUND, "You Are Not Authorized!!");
  }

  const jwtpayload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = jwt.sign(
    jwtpayload,
    config.jwt_access_secrect as string,
    {
      expiresIn: config.jwt_access_expires as string,
    }
  );

  return { userData, accessToken };
};

export const AuthServices = {
  login,
  signUp,
};
