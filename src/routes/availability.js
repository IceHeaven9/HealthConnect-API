import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getDoctorAvailability } from '../controllers/availability/availability.js';

export const availabilityRoutes = Router();

// Endpoint para obtener las horas libres de los doctores de una especialidad en una fecha dada
availabilityRoutes.get('/availability', asyncHandler(getDoctorAvailability));