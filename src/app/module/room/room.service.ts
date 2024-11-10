import mongoose, { startSession } from "mongoose";
import { TRoom } from "./room.interface";
import { Room } from "./room.model";
import { string } from "zod";

const createRoomIntoDb = async (payload: TRoom) => {
  const result = await Room.create(payload);

  const res = {
    _id: result._id,
    name: result.name,
    roomNo: result.roomNo,
    floorNo: result.floorNo,
    capacity: result.capacity,
    pricePerSlot: result.pricePerSlot,
    amenities: result.amenities,
    images: result.images,
    isDeleted: result.isDeleted,
  };
  return res;
};

const getSingleRoomsFromDb = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};

const getAllRoomsFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  let searchTerm = " ";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Room.find({
    $or: ["name"].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  //filtering
  const excludesFields = ["searchTerm", "sort", "limit", "page"];
  excludesFields.forEach((el) => delete queryObj[el]);
  console.log({ query, queryObj });
  const filterQuery = searchQuery.find(queryObj);

  let sort = "pricePerSlot";
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 8;
  let page = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = await paginateQuery.limit(limit);
  return limitQuery;
};

const updateRoomsIntoDb = async (id: string, payload: Partial<TRoom>) => {
  const { amenities, ...remainningData } = payload;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    console.log(amenities);

    if (amenities && amenities.length > 0) {
      const result = await Room.findByIdAndUpdate(id, {
        $addToSet: { amenities: { $each: [...amenities] } },
      });
    }

    const result = await Room.findByIdAndUpdate(id, remainningData, {
      new: true,
    });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const deleteRoomFromDb = async (id: string) => {
  // const result = await Room.findByIdAndUpdate(id, { isDeleted: true });
  const result = await Room.findByIdAndDelete(id);
  console.log("result:", result);

  return result;
};

export const RoomServices = {
  createRoomIntoDb,
  getAllRoomsFromDb,
  getSingleRoomsFromDb,
  updateRoomsIntoDb,
  deleteRoomFromDb,
};
