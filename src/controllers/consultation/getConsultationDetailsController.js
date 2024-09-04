import {
	getConsultationDetailsByPatientId,
	getConsultationFilesByConsultationId,
	getConsultationsDetailsByDoctorId,
	getResponseFilesByResponseId,
} from '../../database/consultation.js';
import { findDoctorById } from '../../database/users.js';

// Controlador para obtener los detalles de una consulta

export const getConsultationDetailsController = async (req, res) => {
	const userId = req.currentUser.id;
	const user = await findDoctorById(userId);
	const { id } = req.params;

	if (user.userType === 'patient') {
		const consultation = await getConsultationDetailsByPatientId(req, res);
		res.status(200).json(consultation, consultationFiles);
	}

	if (user.userType === 'doctor') {
		const consultation = await getConsultationsDetailsByDoctorId(id);
		const responseId = consultation.responseId;
		const consultationFiles = await getConsultationFilesByConsultationId(id);
		const responseFiles = await getResponseFilesByResponseId(responseId);

		const result = {
			...consultation,
			consultationFiles,
			responseFiles,
		};

		res.status(200).json(result);
	}
};
