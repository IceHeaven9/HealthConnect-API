import { getSpecialities } from '../../database/specialities.js';

// Controlador para obtener las especialidades

export const getSpecilitiesController = async (req, res) => {
	const [specialities] = await getSpecialities();
	if (!specialities) {
		throw generateErrors(404, 'NOT_FOUND', 'No se encontraron especialidades');
	}
	res.status(200).json(specialities);
};
