// Controlador para poder modificar una consulta antes de 48 horas antes de la fecha de la consulta

import { modifyTitleConsultation } from '../../database/services/consultations/modifyTitleConsultation.js';
import { modifySeverityConsultation } from '../../database/services/consultations/modifySeverityConsultation.js';
import { modifyDescriptionConsultation } from '../../database/services/consultations/modifyDescriptionConsultation.js';
import { getConsultationDetailsByPatientId } from '../../database/services/consultations/getConsultationDetailsByPatientId.js';
import { parseModifyConsultationPayload } from '../../validations/consultations.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const modifyConsultationController = async (req, res) => {
	const { id } = req.params;
	const { title, description, severity } = parseModifyConsultationPayload(
		req.body
	);

	const consultation = await getConsultationDetailsByPatientId(req, res);
	const currentDate = new Date();
	const consultationDate = consultation.date;
	const diffTime = Math.abs(consultationDate - currentDate);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (
		consultation.status === 'completed' ||
		consultation.status === 'cancelled'
	) {
		throw generateErrors(403, 'FORBIDDEN', 'La consulta no se puede modificar');
	}

	if (diffDays <= 2) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'No se puede modificar una consulta con menos de 48 horas de antelación'
		);
	}

	await modifyTitleConsultation(id, title);

	await modifyDescriptionConsultation(id, description);

	await modifySeverityConsultation(id, severity);

	res.status(200).json({ message: 'Consulta modificada correctamente' });
};
