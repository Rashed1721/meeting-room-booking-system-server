import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validateRequest";
import { slotValidations } from "./slot.validation";
import { SlotControllers } from "./slot.controller";

const router = express.Router();

router.post(
  "/",
  // auth(USER_ROLE.admin),
  validateRequest(slotValidations.createSlotValidationSchema),
  SlotControllers.createSlot
);

router.get("/availability", SlotControllers.getAllSlot);
router.get("/:id", SlotControllers.getSingleSlot);
router.put("/:id", SlotControllers.UpdateSlot);
router.delete("/:id", SlotControllers.deleteSlot);

export const SlotRoutes = router;
