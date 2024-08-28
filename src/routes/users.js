import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { doctorsController } from '../controllers/users/doctorsController.js';
import { authMiddleware } from './../middlewares/authMiddleware.js';
import { uploadAvatarController } from '../controllers/users/avatarController.js';
import { getDoctorById } from '../controllers/users/getDoctorsInfo.js';
import { updateProfileController } from '../controllers/users/updateProfileController.js';

export const usersRoutes = Router();

// Endpoint de la lista de médicos

usersRoutes.get('/doctors', asyncHandler(doctorsController));

// Endpoint para obtener un doctor por su id
usersRoutes.get('/doctors/:id', asyncHandler(getDoctorById))

// Endpoint para actualizar el perfil del usuario
usersRoutes.patch('/profile/:id',authMiddleware, asyncHandler(updateProfileController));

// Endpoint para subir un avatar

usersRoutes.post(
	'/avatar',
	authMiddleware,
	asyncHandler(uploadAvatarController)
);
