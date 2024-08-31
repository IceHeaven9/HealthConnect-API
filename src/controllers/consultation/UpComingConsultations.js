// Controlador para obtener todas las consultas futuras de un usuario

import { getFutureConsultations } from '../../database/consultation.js';

export const getUpcomingConsultationsController = async (req, res) => {
	const consultations = await getFutureConsultations(req, res);
	res.status(200).json(consultations);
};
