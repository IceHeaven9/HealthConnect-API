import { getDoctors } from '../../database/users.js';

// Controlador para obtener los doctores

export const doctorsController = async (req, res) => {
	const doctors = await getDoctors();
	res.status(200).json(doctors);
};
