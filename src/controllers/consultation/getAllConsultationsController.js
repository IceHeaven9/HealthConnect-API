import { getAllConsultations } from '../../database/consultation.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const getAllConsultationsController = async (req, res) => {
	const user = req.currentUser;

	if (user.userType !== 'doctor') {
		throw generateErrors(
			401,
			'UnauthorizedError',
			'No estás autorizado para realizar esta acción.'
		);
	}
	const consultations = await getAllConsultations(req);
	return res.status(200).json(consultations);
};
