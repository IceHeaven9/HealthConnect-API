// CONTROLADOR PARA OBTENER LA INFORMACION DE UN MÉDICO

import { findUserById } from '../../database/users.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const getDoctorById = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		throw generateErrors(404, 'NOT_FOUND', 'Doctor not found');
	}

	const doctor = await findUserById(id);

	if (!doctor) {
		throw generateErrors(404, 'NOT_FOUND', 'Doctor not found');
	}
	res.status(200).json(doctor);
};
