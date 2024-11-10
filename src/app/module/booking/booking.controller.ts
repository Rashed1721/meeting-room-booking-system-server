import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import config from "../../config";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking create Successully",
    data: result,
  });
});
const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingFromDb();

  if (result.length < 1) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No data found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Bookings Retrived Successully",
      data: result,
    });
  }
});
const getMyBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const decoded = jwt.verify(
    token!,
    config.jwt_access_secrect as string
  ) as JwtPayload;

  const { userId } = decoded;

  const result = await BookingServices.getMyBookingFromDb(userId);

  if (result.length < 1) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No data found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Bookings Retrived Successully",
      data: result,
    });
  }
});

const updateBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  console.log("bookingStatus:", req.body);
  const result = await BookingServices.updateBookingInDb(id, req.body);

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
    message: " Booking updated Successully",
    data: result,
  });
});
const deleteBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookingServices.deleteBookingInDb(id);

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
    message: " Booking deleted Successully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getMyBooking,
  updateBooking,
  deleteBooking,
};
