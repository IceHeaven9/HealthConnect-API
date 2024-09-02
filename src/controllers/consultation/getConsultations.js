import {
	getConsultations,
	getConsultationsBySpecialityId,
} from '../../database/consultation.js';
import { findUserById } from '../../database/users.js';
import { generateErrors } from '../../utils/generateErrors.js';

// Controlador para obtener las consultas

export const getConsultationController = async (req, res) => {
	const userId = req.currentUser.id;

	const user = await findUserById(userId);

	if (!userId) {
		throw generateErrors(401, 'UNAUTHORIZED', 'User not authenticated');
	}
	if (user.userType === 'patient') {
		const consultations = await getConsultations(req, res);
		res.status(200).json(consultations);
	}
	if (user.userType === 'doctor') {
		const consultations = await getConsultationsBySpecialityId(
			req,
			user.specialities
		);

		res.status(200).json(consultations);
	}
};
