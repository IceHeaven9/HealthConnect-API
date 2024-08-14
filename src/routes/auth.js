import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { loginController } from "../controllers/auth/loginController.js";

export const authRoutes = Router();

authRoutes.post("/login", asyncHandler(loginController));
