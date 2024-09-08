// Controlador que cancela uma consulta

import {
	cancelConsultation,
	getConsultationDetailsByPatientId,
	getStatusConsultation,
} from '../../database/consultation.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const cancelConsultationController = async (req, res) => {
	const { id } = req.params;
	const userId = req.currentUser;
	const [[{ status }]] = await getStatusConsultation(id);
	const consultation = await getConsultationDetailsByPatientId(req, res);

	if (!consultation) {
		throw generateErrors(404, 'NOT_FOUND', 'Consulta no encontrada');
	}

	if (consultation.patientEmail !== userId.email) {
		throw generateErrors(
			403,
			'FORBIDDEN',
			'No estás autorizado para cancelar esta consulta'
		);
	}

	const currentDate = new Date();
	const consultationDate = consultation.date;
	const diffTime = Math.abs(consultationDate - currentDate);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 2) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'No puedes modificar una consulta con menos de 48 horas de antelación'
		);
	}
	if (status === 'cancelled') {
		throw generateErrors(400, 'BAD_REQUEST', 'Consulta ya cancelada');
	}
	if (status === 'completed') {
		throw generateErrors(400, 'BAD_REQUEST', 'Consulta ya completada');
	}
	if (status === 'pending') {
		await cancelConsultation(id);
	}
	return res.status(200).json({ message: 'Consulta cancelada' });
};
