import {
	getConsultationDetailsByPatientId,
	getConsultationsDetailsByDoctorId,
} from '../../database/consultation.js';
import { findDoctorById } from '../../database/users.js';

// Controlador para obtener los detalles de una consulta

export const getConsultationDetailsController = async (req, res) => {
	const { id } = req.params;
	const userId = req.currentUser.id;
	const user = await findDoctorById(userId);

	if (!id) {
		throw generateErrors(400, 'INVALID_REQUEST', 'Missing consultation ID');
	}

	if (user.userType === 'patient') {
		const consultation = await getConsultationDetailsByPatientId(req, res);
		res.status(200).json(consultation);
	}

	if (user.userType === 'doctor') {
		const getConsultationsBySpecialityId =
			await getConsultationsDetailsByDoctorId(id, user.id);

		res.status(200).json(getConsultationsBySpecialityId);
	}
};
