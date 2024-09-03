import {
	getPatientsConsultations,
	getDoctorsConsultationsBySpecialityId,
} from '../../database/consultation.js';
import { findUserById } from '../../database/users.js';

// Controlador para obtener las consultas

export const getMyConsultationController = async (req, res) => {
	const userId = req.currentUser.id;

	const user = await findUserById(userId);

	if (user.userType === 'patient') {
		const consultations = await getPatientsConsultations(req, res);
		return res.json(consultations);
	}
	if (user.userType === 'doctor') {
		const consultations = await getDoctorsConsultationsBySpecialityId(
			req,
			user.specialities
		);
		return res.json(consultations);
	}
};
