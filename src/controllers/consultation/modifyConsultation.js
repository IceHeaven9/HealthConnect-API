// Controlador para poder modificar una consulta antes de 48 horas antes de la fecha de la consulta

import {
	getConsultationById_ByPatientID,
	modifyDescriptionConsultation,
	modifySeverityConsultation,
	modifyTitleConsultation,
} from '../../database/consultation.js';

export const modifyConsultationController = async (req, res) => {
	const { id } = req.params;
	const { title, description, severity } = req.body;
	const consultation = await getConsultationById_ByPatientID(req, res);

	if (!consultation) {
		return res.status(404).json({ message: 'Consultation not found' });
	}

	const currentDate = new Date();
	const consultationDate = consultation.date;
	console.log(currentDate);
	console.log(consultationDate);
	const diffTime = Math.abs(consultationDate - currentDate);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 2) {
		return res.status(400).json({
			message:
				'You can not modify a consultation less than 48 hours before the consultation',
		});
	}
	if (title) {
		await modifyTitleConsultation(id, title);
	}
	if (description) {
		await modifyDescriptionConsultation(id, description);
	}
	if (severity) {
		await modifySeverityConsultation(id, severity);
	}

	res.status(200).json({ message: 'Consultation modified successfully' });
};
