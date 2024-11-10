import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";

const router = express.Router();
router.get("/:id", UserControllers.getSinglUser);
router.put("/:id", UserControllers.UpdateUser);
export const UserRoutes = router;
