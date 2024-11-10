"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("./paymentController");
const router = express_1.default.Router();
router.post("/confirmation", paymentController_1.paymentController.confirmationController);
exports.paymentRoutes = router;
