// Controlador para obtener todas las consultas finalizadas (status = completed)

import { getFinishedConsultations } from '../../database/services/consultations/getFinishedConsultations.js';

export const getFinishedConsultationsController = async (req, res) => {
	const consultations = await getFinishedConsultations(req, res);

	res.json(consultations);
};
