import {
	getConsultationById_ByPatientID,
	getConsultationsById_ByDoctorId,
} from '../../database/consultation.js';
import { findUserById } from '../../database/users.js';

// Controlador para obtener los detalles de una consulta

export const getConsultationDetailsController = async (req, res) => {
	const { id } = req.params;
	const userId = req.currentUser.id;
	const user = await findUserById(userId);

	if (!id) {
		throw generateErrors(400, 'INVALID_REQUEST', 'Missing consultation ID');
	}

	if (user.userType === 'patient') {
		const consultation = await getConsultationById_ByPatientID(req, res);
		res.status(200).json(consultation);
	}

	if (user.userType === 'doctor') {
		const getConsultationsBySpecialityId =
			await getConsultationsById_ByDoctorId(id, user.id);

		res.status(200).json(getConsultationsBySpecialityId);
	}
};
