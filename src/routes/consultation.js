import { Router } from 'express';
import { createConsultationController } from '../controllers/consultation/createConsultation.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getConsultationDetailsController } from '../controllers/consultation/getconsultationbyid.js';
import { getMyConsultationController } from '../controllers/consultation/getConsultationsPatientOrDoctor.js';
import { parseCurrentUser, authGuard } from '../middlewares/authMiddleware.js';
import { unassignedConsultationController } from '../controllers/consultation/unassignedConsultation.js';
import { assignConsultationController } from '../controllers/consultation/assignConsultation.js';
import { modifyConsultationController } from '../controllers/consultation/modifyConsultation.js';
import { cancelConsultationController } from '../controllers/consultation/cancelConsultation.js';
import { getFinishedConsultationsController } from '../controllers/consultation/finishedConsultations.js';
import { uploadConsultationFilesController } from '../controllers/consultation/uploadConsultationFiles.js';
import { getUpcomingConsultationsController } from '../controllers/consultation/UpComingConsultations.js';
import { deleteConsultationFileController } from '../controllers/consultation/deleteConsultationFile.js';

export const consultationRoutes = Router();

// Ruta para crear una consulta

consultationRoutes.post(
	'/consultations',
	parseCurrentUser,
	authGuard,
	asyncHandler(createConsultationController)
);

// Ruta para obtener consultas sin asignar

consultationRoutes.get(
	'/unassigned-consultation',
	parseCurrentUser,
	authGuard,
	asyncHandler(unassignedConsultationController)
);

// Ruta para asignar un medico a una consulta

consultationRoutes.post(
	'/assign-consultation',
	parseCurrentUser,
	authGuard,
	asyncHandler(assignConsultationController)
);

// Ruta para obtener todas las consultas de un paciente o de una especialidad de un medico

consultationRoutes.get(
	'/my-consultations',
	parseCurrentUser,
	authGuard,
	asyncHandler(getMyConsultationController)
);

// Ruta para obtener todas las consultas

// Ruta para obtener los datos de una consulta

consultationRoutes.get(
	'/consultations/:id/details',
	parseCurrentUser,
	authGuard,
	asyncHandler(getConsultationDetailsController)
);

// Ruta para poder modificar una consulta antes de 48 horas antes de la fecha de la consulta

consultationRoutes.patch(
	'/consultations/:id',
	parseCurrentUser,
	authGuard,
	asyncHandler(modifyConsultationController)
);

// Ruta para poder cancelar una consulta

consultationRoutes.patch(
	'/consultations/:id/cancel',
	parseCurrentUser,
	authGuard,
	asyncHandler(cancelConsultationController)
);

//Ruta para obtener Consultas Finalizadas

consultationRoutes.get(
	'/finished-Consultations',
	parseCurrentUser,
	authGuard,
	asyncHandler(getFinishedConsultationsController)
);

// Ruta para obtener proximas consultas de un usuario

consultationRoutes.get(
	'/consultations/:userId/upcoming',
	parseCurrentUser,
	authGuard,
	asyncHandler(getUpcomingConsultationsController)
);

consultationRoutes.post(
	'/consultations/:id/files',
	parseCurrentUser,
	authGuard,
	asyncHandler(uploadConsultationFilesController)
);

consultationRoutes.delete(
	'/consultations/:id/:fileName',
	parseCurrentUser,
	authGuard,
	asyncHandler(deleteConsultationFileController)
);
