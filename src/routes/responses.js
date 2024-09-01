import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createResponsesController } from '../controllers/responses/createResponses.js';
import { editResponseController } from '../controllers/responses/editResponses.js';
import { setRatingController } from '../controllers/responses/setRating.js';
import {uploadResponseFilesController} from '../controllers/responses/uploadResponseFiles.js';

export const responsesRoutes = Router();

// Ruta para responder a una consulta

responsesRoutes.post(
	'/consultations/:id/response',
	authMiddleware,
	asyncHandler(createResponsesController)
);

// Ruta para editar una respuesta a una consulta (sólo el doctor puede hacerlo, y solo si está sin valorar)

responsesRoutes.patch(
	'/consultations/:id/response/edit',
	authMiddleware,
	asyncHandler(editResponseController)
);

// ruta para valorar una respuesta 

responsesRoutes.patch(
	'/consultations/:id/response/rate',
	authMiddleware,
	asyncHandler(setRatingController)
);

responsesRoutes.post(
	"/response/:id/files",
	authMiddleware,
	asyncHandler(uploadResponseFilesController)
);