import { Router } from 'express';
import { createConsultationController } from '../controllers/consultation/createConsultation.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getConsultationDetailsController } from '../controllers/consultation/getconsultationbyid.js';
import { getMyConsultationController } from '../controllers/consultation/getConsultationsPatientOrDoctor.js';
import { parseCurrentUser, authGuard } from '../middlewares/authMiddleware.js';
import { assignConsultationController } from '../controllers/consultation/assignConsultation.js';
import { modifyConsultationController } from '../controllers/consultation/modifyConsultation.js';
import { cancelConsultationController } from '../controllers/consultation/cancelConsultation.js';
import { getFinishedConsultationsController } from '../controllers/consultation/finishedConsultations.js';
import { uploadConsultationFilesController } from '../controllers/consultation/uploadConsultationFiles.js';
import { getUpcomingConsultationsController } from '../controllers/consultation/UpComingConsultations.js';
import { deleteConsultationFileController } from '../controllers/consultation/deleteConsultationFile.js';
import { getAllConsultationsController } from '../controllers/consultation/getAllConsultationsController.js';
import { checkUserType } from '../middlewares/checkUserType.js';

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
	asyncHandler(getMyConsultationController)
);

// Ruta para obtener todas las consultas

consultationRoutes.get(
	'/consultations',
	parseCurrentUser,
	authGuard,
	checkUserType('doctor'),
	asyncHandler(getAllConsultationsController)
);

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
