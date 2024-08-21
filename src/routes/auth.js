import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginController } from "../controllers/auth/loginController.js";
import { registerController } from "../controllers/auth/registerController.js";
import { validateEmailController } from "../controllers/auth/validateEmailController.js";
import { resetPasswordController } from "../controllers/auth/resetPasswordController.js";
import { recoveryPasswordController } from "../controllers/auth/recoveryPasswordController.js";
import { authMiddleware } from "./../middlewares/authMiddleware.js";
import { changePasswordController } from "../controllers/auth/changePasswordController.js";

export const authRoutes = Router();

authRoutes.post("/login", asyncHandler(loginController));
authRoutes.post("/register", asyncHandler(registerController));
authRoutes.post("/validate-email", asyncHandler(validateEmailController));

// --> Endpoint para solicitar recuperación de contraseña
authRoutes.post("/recover-password", asyncHandler(recoveryPasswordController));

// Endpoint para restablecer la contraseña
authRoutes.post("/reset/:token", asyncHandler(resetPasswordController));

authRoutes.post(
	"/change-password",
	authMiddleware,
	asyncHandler(changePasswordController)
);
