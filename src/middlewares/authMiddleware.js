import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants.js';
import { generateErrors } from '../utils/generateErrors.js';

// Middleware para analizar el token JWT y asignar el usuario actual a la solicitud
export async function parseCurrentUser(req, res, next) {
	const token = req.headers.authorization;

	if (token) {
		try {
			req.currentUser = jwt.verify(token, JWT_SECRET);
		} catch (err) {
			if (err instanceof jwt.TokenExpiredError) {
				return next(
					generateErrors(
						401,
						'TOKEN_EXPIRED',
						'Your session has expired. Please log in again.'
					)
				);
			}
			return next(err);
		}
	}

	next();
}
// Middleware para proteger rutas que requieren autenticación

export function authGuard(req, res, next) {
	if (!req.currentUser) {
		throw generateErrors(
			401,
			'UNAUTHORIZED',
			'You must be logged in to access this resource'
		);
	}

	next();
}
