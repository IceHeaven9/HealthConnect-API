import { Router } from "express";
import { createConsultationController } from "../controllers/consultationControllers/createConsultation";
import { asyncHandler } from "../utils/asyncHandler";

export const consultationRoutes = Router();

consultationRoutes.post(
	"/consultation",
	asyncHandler(createConsultationController)
);
