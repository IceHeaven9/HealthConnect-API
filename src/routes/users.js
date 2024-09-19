import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { doctorsController } from '../controllers/users/doctorsController.js';
import { parseCurrentUser, authGuard } from '../middlewares/authMiddleware.js';
import { uploadAvatarController } from '../controllers/users/avatarController.js';
import { getDoctorById } from '../controllers/users/getDoctorsInfo.js';
import { updateProfileController } from '../controllers/users/updateProfileController.js';
import {getUserProfileController} from '../controllers/users/getUserProfile.js';

export const usersRoutes = Router();

// Endpoint de la lista de médicos

usersRoutes.get('/doctors', asyncHandler(doctorsController));

// Endpoint para obtener un doctor por su id

usersRoutes.get('/doctors/:id', asyncHandler(getDoctorById));

// Endpoint para obtener la info de un user

usersRoutes.get(
  '/profile',
  parseCurrentUser,
  authGuard,
  asyncHandler(getUserProfileController)
);

// Endpoint para actualizar el perfil del usuario

usersRoutes.patch(
	'/profile/:id',
	parseCurrentUser,
	authGuard,
	asyncHandler(updateProfileController)
);

// Endpoint para subir un avatar

usersRoutes.post(
	'/profile/:id/avatar',
	parseCurrentUser,
	authGuard,
	asyncHandler(uploadAvatarController)
);
