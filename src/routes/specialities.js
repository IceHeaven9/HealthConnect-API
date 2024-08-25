import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getSpecilitiesController } from '../controllers/specialities/getspecilitiesController.js';

export const specilitiesRoutes = Router();

// Endpoint que devuelve todas las especialidades

specilitiesRoutes.get('/specialities', asyncHandler(getSpecilitiesController));
