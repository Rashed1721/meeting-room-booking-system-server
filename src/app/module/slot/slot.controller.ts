import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "slots created Successfully",
    data: result,
  });
});

const getAllSlot = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await SlotServices.getAllSlotFromDb(req.query);
  console.log("result from Controller==>", result);
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
      message: "slots Retrived Successfully",
      data: result,
    });
  }
});

const getSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotServices.getSingleSlotsFromDb(id);

  if (result) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Slot retrieved successfully",
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

const UpdateSlot = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SlotServices.updateSlotgInDb(id, req.body);

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
    message: " slot updated Successully",
    data: result,
  });
});

const deleteSlot = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SlotServices.deleteSlotInDb(id);

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
    message: " slot deleted Successully",
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAllSlot,
  getSingleSlot,
  UpdateSlot,
  deleteSlot,
};
