import { getSpecialities } from '../../database/specialities.js';

// Controlador para obtener las especialidades

export const getSpecilitiesController = async (req, res) => {
	const [specialities] = await getSpecialities();
	res.status(200).json(specialities);
};
