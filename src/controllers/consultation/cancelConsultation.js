// Controlador que cancela uma consulta

import {
	cancelConsultation,
	getConsultationById_ByPatientID,
	getStatusConsultation,
} from '../../database/consultation.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const cancelConsultationController = async (req, res) => {
	const { id } = req.params;
	const userId = req.currentUser;
	const [[{ status }]] = await getStatusConsultation(id);
	const consultation = await getConsultationById_ByPatientID(req, res);

	if (!consultation) {
		throw generateErrors(404, 'NOT_FOUND', 'Consultation not found');
	}

	if (consultation.patientEmail !== userId.email) {
		throw generateErrors(
			403,
			'FORBIDDEN',
			'You are not authorized to cancel this consultation'
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
			'You can not modify a consultation less than 48 hours before the consultation'
		);
	}
	if (status === 'cancelled') {
		throw generateErrors(400, 'BAD_REQUEST', 'Consultation already cancelled');
	}
	if (status === 'completed') {
		throw generateErrors(400, 'BAD_REQUEST', 'Consultation already completed');
	}
	if (status === 'pending') {
		await cancelConsultation(id);
	}
	return res.status(200).json({ message: 'Consultation cancelled' });
};
