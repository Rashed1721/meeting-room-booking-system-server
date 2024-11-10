import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getSinglUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleRoomsFromDb(id);

  if (result) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user retrieved successfully",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No data found",
      data: result,
    });
  }
});

const UpdateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.updateUserInDb(id, req.body);

  if (result === null) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: " Not Data Found",
      data: result,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " user updated Successully",
    data: result,
  });
});

export const UserControllers = { getSinglUser, UpdateUser };
