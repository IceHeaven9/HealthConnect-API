import {
	getConsultationDetailsByPatientId,
	getConsultationFilesByConsultationId,
	getConsultationsDetailsByDoctorId,
	getResponseFilesByResponseId,
} from '../../database/consultation.js';
import { findUserById } from '../../database/users.js';

// Controlador para obtener los detalles de una consulta

export const getConsultationDetailsController = async (req, res) => {
	const userId = req.currentUser.id;
	const user = await findUserById(userId);
	const { id } = req.params;

	if (user.userType === 'patient') {
		const consultation = await getConsultationDetailsByPatientId(req, res);
		const consultationId = consultation.id;
		const consultationFiles =
			await getConsultationFilesByConsultationId(consultationId);
		const responseId = consultation.responseId;
		const responseFiles = await getResponseFilesByResponseId(responseId);
		const result = {
			...consultation,
			consultationFiles,
			responseFiles,
		};

		res.status(200).json(result);
	}

	if (user.userType === 'doctor') {
		const consultation = await getConsultationsDetailsByDoctorId(req, res);
		const consultationId = consultation.id;
		const consultationFiles =
			await getConsultationFilesByConsultationId(consultationId);
		const responseId = consultation.responseId;
		const responseFiles = await getResponseFilesByResponseId(responseId);

		const result = {
			...consultation,
			consultationFiles,
			responseFiles,
		};

		res.status(200).json(result);
	}
};
