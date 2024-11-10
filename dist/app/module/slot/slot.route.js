"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const slot_validation_1 = require("./slot.validation");
const slot_controller_1 = require("./slot.controller");
const router = express_1.default.Router();
router.post("/", 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(slot_validation_1.slotValidations.createSlotValidationSchema), slot_controller_1.SlotControllers.createSlot);
router.get("/availability", slot_controller_1.SlotControllers.getAllSlot);
router.get("/:id", slot_controller_1.SlotControllers.getSingleSlot);
router.put("/:id", slot_controller_1.SlotControllers.UpdateSlot);
router.delete("/:id", slot_controller_1.SlotControllers.deleteSlot);
exports.SlotRoutes = router;
