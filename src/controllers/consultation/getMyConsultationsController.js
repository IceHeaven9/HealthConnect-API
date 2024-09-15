import { getDoctorsConsultationsBySpecialityId } from '../../database/services/consultations/getDoctorsConsultationsBySpecialityId.js';
import { getPatientsConsultations } from '../../database/services/consultations/getPatientsConsultations.js';
import { findUserById } from '../../database/services/users/findUserById.js';

// Controlador para obtener las consultas

export const getMyConsultationsController = async (req, res) => {
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
