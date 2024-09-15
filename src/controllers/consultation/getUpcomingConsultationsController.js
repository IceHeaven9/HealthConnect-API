// Controlador para obtener todas las consultas futuras de un usuario

import { getFutureConsultations } from '../../database/services/consultations/getFutureConsultations.js';

export const getUpcomingConsultationsController = async (req, res) => {
	const consultations = await getFutureConsultations(req);

	res.status(200).json(consultations);
};
