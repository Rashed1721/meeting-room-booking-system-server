import express from "express";
import { BookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.get("/", auth(USER_ROLE.user), BookingControllers.getMyBooking);

export const MyBookingRoutes = router;
