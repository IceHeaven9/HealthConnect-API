import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { doctorsController } from "../controllers/users/doctorsController.js";

export const usersRoutes = Router();

// Endpoint de la lista de médicos
usersRoutes.get("/doctors", asyncHandler(doctorsController));
