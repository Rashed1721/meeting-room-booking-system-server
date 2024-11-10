import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomServices } from "./room.service";

const createRoom = catchAsync(async (req, res) => {
  console.log("from controller ", req.body);
  const result = await RoomServices.createRoomIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.getSingleRoomsFromDb(id);

  if (result) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Room retrieved successfully",
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

const getAllRooms = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await RoomServices.getAllRoomsFromDb(req.query);

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
      message: "Room retrieved successfully",
      data: result,
    });
  }
});

const updateRoom = catchAsync(async (req, res) => {
  const roomId = req.params.id;
  const result = await RoomServices.updateRoomsIntoDb(roomId, req.body);

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
    message: "Room updated Successfully",
    data: result,
  });
});

const deleteRoom = catchAsync(async (req, res) => {
  const roomId = req.params.id;
  const result = await RoomServices.deleteRoomFromDb(roomId);

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
    message: "Room Deleted Successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getSingleRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
