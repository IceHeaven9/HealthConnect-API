import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getSpecilitiesController } from '../controllers/specialities/getspecilitiesController.js';
import { getDoctorsBySpecialityController } from '../controllers/users/getDoctorsBySpeciality.js';

export const specilitiesRoutes = Router();

// Endpoint que devuelve todas las especialidades

specilitiesRoutes.get('/specialities', asyncHandler(getSpecilitiesController));

// Ruta para obtener todos los doctores de una especialidad específica

specilitiesRoutes.get(
	'/specialities/:specialityId/doctors',
	asyncHandler(getDoctorsBySpecialityController)
);
