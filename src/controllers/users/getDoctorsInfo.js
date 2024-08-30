// CONTROLADOR PARA OBTENER LA INFORMACION DE UN MÉDICO

import { findUserById } from '../../database/users.js';

export const getDoctorById = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(404).json({ error: 'Doctor not found' });
	}

	const doctor = await findUserById(id);

	if (!doctor) {
		return res.status(404).json({ error: 'Doctor not found' });
	}
	res.status(200).json(doctor);
};
