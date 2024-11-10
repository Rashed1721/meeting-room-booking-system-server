import express from "express";
import { UserRoutes } from "../module/user/user.routes";
import { AuthRoutes } from "../module/auth/auth.route";
import { RoomRoutes } from "../module/room/room.route";
import { SlotRoutes } from "../module/slot/slot.route";
import { BookingRoutes } from "../module/booking/booking.route";
import { MyBookingRoutes } from "../module/booking/myBooking.route";
import { paymentRoutes } from "../module/payment/payment.route";

const router = express.Router();

const moduleRoutes = [
  // {
  //   path: "/auth",
  //   route: UserRoutes,
  // },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/rooms",
    route: RoomRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/my-bookings",
    route: MyBookingRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
