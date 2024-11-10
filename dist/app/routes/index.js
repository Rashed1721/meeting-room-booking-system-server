"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../module/user/user.routes");
const auth_route_1 = require("../module/auth/auth.route");
const room_route_1 = require("../module/room/room.route");
const slot_route_1 = require("../module/slot/slot.route");
const booking_route_1 = require("../module/booking/booking.route");
const myBooking_route_1 = require("../module/booking/myBooking.route");
const payment_route_1 = require("../module/payment/payment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // {
    //   path: "/auth",
    //   route: UserRoutes,
    // },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/rooms",
        route: room_route_1.RoomRoutes,
    },
    {
        path: "/slots",
        route: slot_route_1.SlotRoutes,
    },
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRoutes,
    },
    {
        path: "/my-bookings",
        route: myBooking_route_1.MyBookingRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
