import mongoose from "mongoose";
import {
  convertToMinutes,
  convertToTimeString,
  filterSearchQuery,
} from "./slot.constant";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotIntoDb = async (payload: TSlot) => {
  const { date, room, startTime, endTime, isBooked } = payload;

  let eachSlot: TSlot[] = [];
  const slotDuration: number = 60;
  const endTimeInMin: number = convertToMinutes(endTime);
  const startTimeInMin: number = convertToMinutes(startTime);
  const TotalTime: number = endTimeInMin - startTimeInMin;
  const totalslot = TotalTime / slotDuration;

  for (let i = 0; i < totalslot; i++) {
    const startSlotInMin = startTimeInMin + i * 60;
    const endSlotInMin = startTimeInMin + (i + 1) * 60;

    eachSlot.push({
      room: room,
      date: date,
      startTime: convertToTimeString(startSlotInMin),
      endTime: convertToTimeString(endSlotInMin),
      isBooked: isBooked,
    });
  }

  const result = await Promise.all(
    eachSlot.map(async (slot) => {
      const createdSlot = await Slot.create(slot);
      return createdSlot;
    })
  );

  return result;
};

const getSingleSlotsFromDb = async (id: string) => {
  const result = await Slot.findOne({});
  return result;
};

const getAllSlotFromDb = async (query: Record<string, unknown>) => {
  const searchQuery = {
    date: query.date,
    room: query.roomId,
  };

  const finalQuery = filterSearchQuery(query, searchQuery);
  console.log(finalQuery);

  const result = await Slot.find({ isBooked: false, ...finalQuery }).populate(
    "room"
  );
  return result;
};

const updateSlotgInDb = async (id: string, payload: Partial<TSlot>) => {
  const data = await Slot.findById(id);
  const result = await Slot.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteSlotInDb = async (id: string) => {
  const result = await Slot.findByIdAndDelete(id);
  return result;
};

export const SlotServices = {
  createSlotIntoDb,
  getAllSlotFromDb,
  getSingleSlotsFromDb,
  updateSlotgInDb,
  deleteSlotInDb,
};
