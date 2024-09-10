// Controlador para obtener la lista de las consultas que están sin asignarse a un médico

import { getUnassignedConsultationsBySpecialityId } from '../../database/consultation.js';
import { parseUnassignedConsultationsPayload } from '../../validations/consultations.js';

export const getUnassignedConsultationsController = async (req, res) => {
	const { specialityIds } = parseUnassignedConsultationsPayload(req.body);

	const unassignedConsultations =
		await getUnassignedConsultationsBySpecialityId(req, specialityIds);
	res.status(200).json(unassignedConsultations);
};
