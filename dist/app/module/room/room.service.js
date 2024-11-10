"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const room_model_1 = require("./room.model");
const createRoomIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.create(payload);
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
});
const getSingleRoomsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findById(id);
    return result;
});
const getAllRoomsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    let searchTerm = " ";
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    const searchQuery = room_model_1.Room.find({
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
        sort = query.sort;
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
    const limitQuery = yield paginateQuery.limit(limit);
    return limitQuery;
});
const updateRoomsIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { amenities } = payload, remainningData = __rest(payload, ["amenities"]);
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        console.log(amenities);
        if (amenities && amenities.length > 0) {
            const result = yield room_model_1.Room.findByIdAndUpdate(id, {
                $addToSet: { amenities: { $each: [...amenities] } },
            });
        }
        const result = yield room_model_1.Room.findByIdAndUpdate(id, remainningData, {
            new: true,
        });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
const deleteRoomFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Room.findByIdAndUpdate(id, { isDeleted: true });
    const result = yield room_model_1.Room.findByIdAndDelete(id);
    console.log("result:", result);
    return result;
});
exports.RoomServices = {
    createRoomIntoDb,
    getAllRoomsFromDb,
    getSingleRoomsFromDb,
    updateRoomsIntoDb,
    deleteRoomFromDb,
};
