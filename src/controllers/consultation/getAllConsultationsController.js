import { getAllConsultations } from '../../database/consultation.js';

export const getAllConsultationsController = async (req, res) => {
	const consultations = await getAllConsultations(req);
	return res.status(200).json(consultations);
};
