import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { doctorsController } from '../controllers/users/doctorsController.js';
import { authMiddleware } from './../middlewares/authMiddleware.js';
import { uploadAvatarController } from '../controllers/users/avatarController.js';

export const usersRoutes = Router();

// Endpoint de la lista de médicos

usersRoutes.get('/doctors', asyncHandler(doctorsController));

// Endpoint para subir un avatar

usersRoutes.post(
	'/avatar',
	authMiddleware,
	asyncHandler(uploadAvatarController)
);
