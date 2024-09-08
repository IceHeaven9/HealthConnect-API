import { Router } from 'express';
import { checkUserType } from '../middlewares/checkUserType.js';
import { createConsultationController } from '../controllers/consultation/createConsultationController.js';
import { assignConsultationController } from '../controllers/consultation/assignConsultationController.js';
import { getMyConsultationsController } from '../controllers/consultation/getMyConsultationsController.js';
import { getAllConsultationsController } from '../controllers/consultation/getAllConsultationsController.js';
import { getConsultationDetailsController } from '../controllers/consultation/getConsultationDetailsController.js';
import { modifyConsultationController } from '../controllers/consultation/modifyConsultationController.js';
import { cancelConsultationController } from '../controllers/consultation/cancelConsultationController.js';
import { getFinishedConsultationsController } from '../controllers/consultation/getFinishedConsultationsController.js';
import { getUpcomingConsultationsController } from '../controllers/consultation/getUpcomingConsultationsController.js';
import { uploadConsultationFilesController } from '../controllers/consultation/uploadConsultationFilesController.js';
import { deleteConsultationFileController } from '../controllers/consultation/deleteConsultationFileController.js';
import { authGuard, parseCurrentUser } from '../middlewares/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const consultationRoutes = Router();

// Ruta para crear una consulta

consultationRoutes.post(
	'/consultations',
	parseCurrentUser,
	authGuard,
	asyncHandler(createConsultationController)
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
	asyncHandler(getMyConsultationsController)
);

// Ruta para obtener todas las consultas solo doctores

consultationRoutes.get(
	'/consultations',
	parseCurrentUser,
	authGuard,
	checkUserType('doctor'),
	asyncHandler(getAllConsultationsController)
);

// Ruta para obtener los detalles de una consulta

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
	checkUserType('patient'),
	asyncHandler(modifyConsultationController)
);

// Ruta para poder cancelar una consulta

consultationRoutes.patch(
	'/consultations/:id/cancel',
	parseCurrentUser,
	authGuard,
	checkUserType('patient'),
	asyncHandler(cancelConsultationController)
);

//Ruta para obtener Consultas Finalizadas

consultationRoutes.get(
	'/consultations/completed',
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

// Ruta para subir archivos a una consulta

consultationRoutes.post(
	'/consultations/:id/files',
	parseCurrentUser,
	authGuard,
	checkUserType('patient'),
	asyncHandler(uploadConsultationFilesController)
);

// Ruta para eliminar archivos de una consulta

consultationRoutes.delete(
	'/consultations/:id/:fileName',
	parseCurrentUser,
	authGuard,
	checkUserType('patient'),
	asyncHandler(deleteConsultationFileController)
);
