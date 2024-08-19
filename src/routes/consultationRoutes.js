import { Router } from "express";
import { createConsultationController } from "../controllers/consultationControllers/createConsultation.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getConsultationDetailsController } from "../controllers/consultationControllers/getConsultationById.js";
import { getConsultationController } from "../controllers/consultationControllers/getConsultations.js";
import { respondToConsultationController } from "../controllers/consultationControllers/respondToConsultation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const consultationRoutes = Router();

// ... (existing routes)

// Ruta para responder a una consulta
consultationRoutes.put(
  "/consultations/:id/respond",
  authMiddleware,
  asyncHandler(respondToConsultationController)
);