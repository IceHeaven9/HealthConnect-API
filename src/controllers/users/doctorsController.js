import { getDoctors } from '../../database/users.js';
import { generateErrors } from '../../utils/generateErrors.js';

// Controlador para obtener los doctores

export const doctorsController = async (req, res) => {
	const doctors = await getDoctors();
	if (!doctors) {
		throw generateErrors(404, 'NOT_FOUND', 'No se encontraron doctores');
	}
	res.status(200).json(doctors);
};
