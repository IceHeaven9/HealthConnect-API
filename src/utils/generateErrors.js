import { errorLog } from '../utils/logger.js';

// Función para generar errores
export const generateErrors = (status, name, message) => {
	const error = new Error(message);
	error.httpStatus = status;
	return error;
};
export const errorController = (error, req, res, next) => {
	const httpStatus = error.httpStatus || 500;
	const code = error.code || 'INTERNAL_SERVER_ERROR';

	errorLog(httpStatus);
	errorLog(code);
	errorLog(error.message);

	res.status(httpStatus).send({
		status: 'error',
		code,
		message: error.message,
	});
};
