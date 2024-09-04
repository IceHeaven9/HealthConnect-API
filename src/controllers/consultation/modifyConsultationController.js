// Controlador para poder modificar una consulta antes de 48 horas antes de la fecha de la consulta

import {
	getConsultationDetailsByPatientId,
	modifyDescriptionConsultation,
	modifySeverityConsultation,
	modifyTitleConsultation,
} from '../../database/consultation.js';
import { parseModifyConsultationPayload } from '../../validations/consultations.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const modifyConsultationController = async (req, res) => {
	const { id } = req.params;
	const { title, description, severity } = parseModifyConsultationPayload(
		req.body
	);
	const consultation = await getConsultationDetailsByPatientId(req, res);

	if (!consultation) {
		throw generateErrors(404, 'NOT_FOUND', 'Consulta no encontrada');
	}

	const currentDate = new Date();
	const consultationDate = consultation.date;
	const diffTime = Math.abs(consultationDate - currentDate);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 2) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'No se puede modificar una consulta con menos de 48 horas de antelación'
		);
	}

	if (title && title !== consultation.title) {
		await modifyTitleConsultation(id, title);
	} else if (title === consultation.title) {
		throw generateErrors(400, 'BAD_REQUEST', 'El título es el mismo');
	}

	if (description && description !== consultation.description) {
		await modifyDescriptionConsultation(id, description);
	} else if (description === consultation.description) {
		throw generateErrors(400, 'BAD_REQUEST', 'La descripción es la misma');
	}

	if (severity && severity !== consultation.severity) {
		await modifySeverityConsultation(id, severity);
	} else if (severity === consultation.severity) {
		throw generateErrors(400, 'BAD_REQUEST', 'La severidad es la misma');
	}

	if (req.body && Object.keys(req.body).length === 0) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'No se proporcionaron datos para la modificación'
		);
	}

	res.status(200).json({ message: 'Consulta modificada correctamente' });
};
