// Controlador para obtener todas las consultas finalizadas (status = completed)

import { getFinishedConsultations } from '../../database/consultation.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const getFinishedConsultationsController = async (req, res) => {
	const consultations = await getFinishedConsultations(req, res);

	if (!consultations) {
		throw generateErrors(
			404,
			'NOT_FOUND',
			'No se encontraron consultas finalizadas.'
		);
	}
	res.json(consultations);
};
