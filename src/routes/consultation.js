import { Router } from "express";
import { createConsultationController } from "../controllers/consultationControllers/createConsultation.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const consultationRoutes = Router();

consultationRoutes.post(
	"/consultation",
	asyncHandler(createConsultationController)
);
