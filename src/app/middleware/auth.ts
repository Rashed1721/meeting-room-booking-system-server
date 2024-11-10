import httpStatus from "http-status";
import AppError from "../error/AppError";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../module/user/user.model";
import { TUSER_ROLE } from "../module/user/user.interface";

const auth = (...requiredRoles: TUSER_ROLE[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secrect as string
    ) as JwtPayload;

    const { role, email, iat } = decoded;

    const user = User.isUserExists(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "You have no access to this route"
      );
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
