import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { bookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
  "/",
  // auth(USER_ROLE.user),
  validateRequest(bookingValidations.createBookingValidationschema),
  BookingControllers.createBooking
);
router.get(
  "/",
  // auth(USER_ROLE.admin),
  BookingControllers.getAllBooking
);
router.get("/", auth(USER_ROLE.user), BookingControllers.getMyBooking);

router.put(
  "/:id",
  // auth(USER_ROLE.admin),
  validateRequest(bookingValidations.updateBookingValidationschema),
  BookingControllers.updateBooking
);
router.delete(
  "/:id",
  //  auth(USER_ROLE.admin),
  BookingControllers.deleteBooking
);
export const BookingRoutes = router;
