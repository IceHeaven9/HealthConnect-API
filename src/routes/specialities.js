import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getSpecilitiesController } from "../controllers/specialities/getspecilitiesController.js";

export const specilitiesRoutes = Router();

specilitiesRoutes.get("/specialities", asyncHandler(getSpecilitiesController));
