import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginController } from "../controllers/auth/loginController.js";
import { registerController } from "../controllers/auth/registerController.js";
import { validateEmailController } from "../controllers/auth/validateEmailController.js";

export const authRoutes = Router();

authRoutes.post("/login", asyncHandler(loginController));

authRoutes.post("/register", asyncHandler(registerController));

authRoutes.post("/validate-email", asyncHandler(validateEmailController));
