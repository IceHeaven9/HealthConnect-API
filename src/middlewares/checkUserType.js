// Middleware que comprueba si el usuario autenticado tiene el userType 'doctor'

import { generateErrors } from '../utils/generateErrors.js';

export const checkUserType = (requiredType) => {
	return (req, res, next) => {
		const { userType } = req.currentUser;

		if (userType !== requiredType) {
			return next(
				generateErrors(
					403,
					'FOBIDDEN',
					'Acceso denegado. No tienes permisos para realizar esta acción.'
				)
			);
		}

		next();
	};
};
