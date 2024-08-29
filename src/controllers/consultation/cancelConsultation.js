// Controlador que cancela uma consulta

import {
	cancelConsultation,
	getConsultationById_ByPatientID,
	getStatusConsultation,
} from '../../database/consultation.js';

export const cancelConsultationController = async (req, res) => {
	const { id } = req.params;
	const userId = req.currentUser;
	const [[{ status }]] = await getStatusConsultation(id);
	const consultation = await getConsultationById_ByPatientID(req, res);

	if (!consultation) {
		return res.status(404).json({ message: 'Consultation not found' });
	}

	if (consultation.patientEmail !== userId.email) {
		return res
			.status(403)
			.json({ message: 'You are not authorized to cancel this consultation' });
	}

	const currentDate = new Date();
	const consultationDate = consultation.date;
	const diffTime = Math.abs(consultationDate - currentDate);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 2) {
		return res.status(400).json({
			message:
				'You can not modify a consultation less than 48 hours before the consultation',
		});
	}
	if (status === 'cancelled') {
		return res.status(400).json({ message: 'Consultation already cancelled' });
	}
	if (status === 'completed') {
		return res.status(400).json({ message: 'Consultation already completed' });
	}
	if (status === 'pending') {
		await cancelConsultation(id);
	}
	return res.status(200).json({ message: 'Consultation cancelled' });
};
