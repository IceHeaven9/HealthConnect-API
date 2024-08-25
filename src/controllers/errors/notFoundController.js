import { errorLog } from '../../utils/logger.js';

// Controlador para manejar rutas no encontradas

export const notFoundController = (req, res, next) => {
	const resourcePath = req.path;
	errorLog(`404 NOT FOUND THIS ROUTE: ${resourcePath}`);

	next();
};
