import {
	getConsultationDetails,
	getConsultationsById_ByDoctorId,
} from '../../database/consultation.js';
import { findUserById } from '../../database/users.js';

// Función para obtener los datos de una consulta
export const getConsultationDetailsController = async (req, res) => {
	const { id } = req.params;
	const userId = req.currentUser.id;
	const user = await findUserById(userId);

	if (!id) {
		throw generateErrors(400, 'INVALID_REQUEST', 'Missing consultation ID');
	}

	if (user.userType === 'paciente') {
		const consultation = await getConsultationDetails(req, res);
		res.status(200).json(consultation);
	}

	if (user.userType === 'doctor') {
		const getConsultationsBySpecialityId =
			await getConsultationsById_ByDoctorId(id, user.id);

		res.status(200).json(getConsultationsBySpecialityId);
	}
};
