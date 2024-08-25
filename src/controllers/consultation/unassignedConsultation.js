import { getUnassignedConsultations } from '../../database/consultation.js';
import { findUserById } from '../../database/users.js';

// Controlador para obtener las consultas no asignadas

export const unassignedConsultationController = async (req, res) => {
	const userId = req.currentUser.id;
	const user = await findUserById(userId);
	const specialities = user.specialities;

	if (user.userType === 'doctor') {
		const unassignedConsultations =
			await getUnassignedConsultations(specialities);
		res.status(200).json(unassignedConsultations);
	}

	if (user.userType === 'paciente') {
		res.status(403).json({ message: 'Unauthorized access' });
	}
};
