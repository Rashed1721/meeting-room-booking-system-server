import { AuthControllers } from "./auth.controller";
import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidations } from "./auth.validation";
import { userValidations } from "../user/user.validation";

const router = express.Router();

router.post(
  "/signUp",
  validateRequest(userValidations.createUserschemaValidation),
  AuthControllers.signUp
);

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login
);

export const AuthRoutes = router;
