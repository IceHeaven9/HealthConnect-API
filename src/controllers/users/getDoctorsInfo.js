// CONTROLADOR PARA OBTENER LA INFORMACION DE UN MÉDICO

import { findDoctorById } from '../../database/services/users/findDoctorById.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const getDoctorById = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		throw generateErrors(404, 'NOT_FOUND', 'Doctor no encontrado');
	}

	const doctor = await findDoctorById(id);

	if (!doctor || doctor.userType !== 'doctor') {
		throw generateErrors(404, 'NOT_FOUND', 'Doctor no encontrado');
	}
	res.status(200).json(doctor);
};
