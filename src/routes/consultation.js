import { Router } from 'express';
import { createConsultationController } from '../controllers/consultation/createConsultation.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getConsultationDetailsController } from '../controllers/consultation/getconsultationbyid.js';
import { getConsultationController } from '../controllers/consultation/getConsultations.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { unassignedConsultationController } from '../controllers/consultation/unassignedConsultation.js';
import { assignConsultationController } from '../controllers/consultation/assignConsultation.js';

import { modifyConsultationController } from '../controllers/consultation/modifyConsultation.js';
import { cancelConsultationController } from '../controllers/consultation/cancelConsultation.js';
import { getFinishedConsultationsController } from '../controllers/consultation/finishedConsultations.js';
import { getUpcomingConsultationsController } from '../controllers/consultation/upComingConsultations.js';

export const consultationRoutes = Router();

// Ruta para crear una consulta

consultationRoutes.post(
	'/consultations',
	authMiddleware,
	asyncHandler(createConsultationController)
);

// Ruta para obtener consultas sin asignar

consultationRoutes.get(
	'/unassigned-consultation',
	authMiddleware,
	asyncHandler(unassignedConsultationController)
);

// Ruta para asignar un medico a una consulta

consultationRoutes.post(
	'/assign-consultation',
	authMiddleware,
	asyncHandler(assignConsultationController)
);

// Ruta para obtener todas las consultas

consultationRoutes.get(
	'/consultations',
	authMiddleware,
	asyncHandler(getConsultationController)
);

// Ruta para obtener los datos de una consulta

consultationRoutes.get(
	'/consultations/:id/details',
	authMiddleware,
	asyncHandler(getConsultationDetailsController)
);

// Ruta para poder modificar una consulta antes de 48 horas antes de la fecha de la consulta

consultationRoutes.patch(
	'/consultations/:id',
	authMiddleware,
	asyncHandler(modifyConsultationController)
);

// Ruta para poder cancelar una consulta

consultationRoutes.patch(
	'/consultations/:id/cancel',
	authMiddleware,
	asyncHandler(cancelConsultationController)
);

//Ruta para obtener Consultas Finalizadas

consultationRoutes.get(
	'/finished-Consultations',
	authMiddleware,
	asyncHandler(getFinishedConsultationsController)
);

// Ruta para obtener proximas consultas de un usuario

consultationRoutes.get(
	'/consultations/:userId/upcoming',
	authMiddleware,
	asyncHandler(getUpcomingConsultationsController)
);
