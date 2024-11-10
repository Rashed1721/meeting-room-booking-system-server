import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { roomValidations } from "./room.validation";
import { RoomControllers } from "./room.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  // auth(USER_ROLE.admin),
  validateRequest(roomValidations.createRoomValidationSchema),
  RoomControllers.createRoom
);

router.get("/:id", RoomControllers.getSingleRoom);
router.get("/", RoomControllers.getAllRooms);
router.put(
  "/:id",
  // auth(USER_ROLE.admin),
  validateRequest(roomValidations.updateRoomValidationSchema),
  RoomControllers.updateRoom
);
router.delete(
  "/:id",
  // auth(USER_ROLE.admin),
  RoomControllers.deleteRoom
);

export const RoomRoutes = router;
