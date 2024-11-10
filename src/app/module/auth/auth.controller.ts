import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const signUp = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.signUp(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created successfully!",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successfully",
    token: result.accessToken,
    data: result.userData,
  });
});

export const AuthControllers = {
  signUp,
  login,
};
