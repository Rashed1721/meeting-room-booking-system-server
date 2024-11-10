"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const room_validation_1 = require("./room.validation");
const room_controller_1 = require("./room.controller");
const router = express_1.default.Router();
router.post("/", 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(room_validation_1.roomValidations.createRoomValidationSchema), room_controller_1.RoomControllers.createRoom);
router.get("/:id", room_controller_1.RoomControllers.getSingleRoom);
router.get("/", room_controller_1.RoomControllers.getAllRooms);
router.put("/:id", 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(room_validation_1.roomValidations.updateRoomValidationSchema), room_controller_1.RoomControllers.updateRoom);
router.delete("/:id", 
// auth(USER_ROLE.admin),
room_controller_1.RoomControllers.deleteRoom);
exports.RoomRoutes = router;
