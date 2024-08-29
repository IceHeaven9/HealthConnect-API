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
	const diffTime = Math.abs(consultationDate - currentDate);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 2) {
		return res.status(400).json({
			message:
				'You can not modify a consultation less than 48 hours before the consultation',
		});
	}

	if (title && title !== consultation.title) {
		await modifyTitleConsultation(id, title);
	} else if (title === consultation.title) {
		return res.status(400).json({ message: 'Title is the same' });
	}

	if (description && description !== consultation.description) {
		await modifyDescriptionConsultation(id, description);
	} else if (description === consultation.description) {
		return res.status(400).json({ message: 'Description is the same' });
	}

	if (severity && severity !== consultation.severity) {
		await modifySeverityConsultation(id, severity);
	} else if (severity === consultation.severity) {
		return res.status(400).json({ message: 'Severity is the same' });
	}

	if (req.body && Object.keys(req.body).length === 0) {
		return res
			.status(400)
			.json({ message: 'No data provided for modification' });
	}

	res.status(200).json({ message: 'Consultation modified successfully' });
};
