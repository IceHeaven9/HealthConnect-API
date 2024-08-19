import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getResponseByConsultationIdController } from "../controllers/responses/getResponeByConsultationId.js";

export const responsesRoutes = Router();

// ... (existing routes)

// Ruta para responder a una consulta
responsesRoutes.get(
	"/consultations/:id/response",
	authMiddleware,
	asyncHandler(getResponseByConsultationIdController)
);
