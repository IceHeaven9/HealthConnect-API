import { errorLog } from '../utils/logger.js';

// Función para generar errores
// Recibe el status, el nombre y el mensaje del error
// Devuelve un objeto con los datos del error

export const generateErrors = (status, name, message) => {
	errorLog(status);
	errorLog(name);
	errorLog(message);
};

//EJEMPLO DE USO:

export const funcion = (X) => {
	if (X < 0) {
		throw generateErrors(404, 'NOT_FOUND', `El recurso '${X}' no existe`);
	}
};
