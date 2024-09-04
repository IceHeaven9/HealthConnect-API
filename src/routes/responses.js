import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { parseCurrentUser, authGuard } from '../middlewares/authMiddleware.js';
import { createResponsesController } from '../controllers/responses/createResponses.js';
import { editResponseController } from '../controllers/responses/editResponses.js';
import { setRatingController } from '../controllers/responses/setRating.js';
import { uploadResponseFilesController } from '../controllers/responses/uploadResponseFiles.js';
import { deleteResponseFileController } from '../controllers/responses/deleteResponseFile.js';
import { checkUserType } from '../middlewares/checkUserType.js';

export const responsesRoutes = Router();

// Ruta para responder a una consulta

responsesRoutes.post(
	'/consultations/:id/response',
	parseCurrentUser,
	authGuard,
	checkUserType('doctor'),
	asyncHandler(createResponsesController)
);

// Ruta para editar una respuesta a una consulta (sólo el doctor puede hacerlo, y solo si está sin valorar)

responsesRoutes.patch(
	'/consultations/:id/response/edit',
	parseCurrentUser,
	authGuard,
	checkUserType('doctor'),
	asyncHandler(editResponseController)
);

// Ruta para valorar una respuesta

responsesRoutes.patch(
	'/consultations/:id/response/rate',
	parseCurrentUser,
	authGuard,
	checkUserType('patient'),
	asyncHandler(setRatingController)
);

// Ruta para subir archivos a una respuesta

responsesRoutes.post(
	'/response/:id/files',
	parseCurrentUser,
	authGuard,
	checkUserType('doctor'),
	asyncHandler(uploadResponseFilesController)
);

// Ruta para eliminar un archivo de una respuesta

responsesRoutes.delete(
	'/response/:id/:fileName',
	parseCurrentUser,
	authGuard,
	checkUserType('doctor'),
	asyncHandler(deleteResponseFileController)
);
