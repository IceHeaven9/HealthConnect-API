import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createResponsesController } from '../controllers/responses/createResponses.js';

export const responsesRoutes = Router();

// Ruta para responder a una consulta

responsesRoutes.post(
	'/consultations/:id/response',
	authMiddleware,
	asyncHandler(createResponsesController)
);
