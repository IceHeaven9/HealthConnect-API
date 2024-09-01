// Controlador para obtener todas las consultas futuras de un usuario

import { getFutureConsultations } from '../../database/consultation.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const getUpcomingConsultationsController = async (req, res) => {
	const consultations = await getFutureConsultations(req, res);
	if (!consultations)
		throw generateErrors(404, 'NOT_FOUND', 'No upcoming consultations found');
	res.status(200).json(consultations);
};
