import { Router } from "express";
import { createConsultationController } from "../controllers/consultationControllers/createConsultation.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getConsultationDetailsController } from "../controllers/consultationControllers/getconsultationbyid.js";

export const consultationRoutes = Router();

// Ruta para crear una consulta
consultationRoutes.post(
  "/consultations",
  asyncHandler(createConsultationController)
);

// Ruta para obtener todas las consultas
consultationRoutes.get(
  "/consultations",
  asyncHandler(getConsultationController)
);

// Ruta para obtener los datos de una consulta
consultationRoutes.get(
  "/consultations/:id/details",
  asyncHandler(getConsultationDetailsController)
);
