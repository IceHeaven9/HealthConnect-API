// Controlador que cancela uma consulta

import {
	cancelConsultation,
	getStatusConsultation,
} from '../../database/consultation.js';

export const cancelConsultationController = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const status = await getStatusConsultation(id);
	if (status === 'cancelled') {
		return res.status(400).json({ message: 'Consultation already cancelled' });
	}
	if (status === 'completed') {
		return res.status(400).json({ message: 'Consultation already completed' });
	}
	if (status === 'pending') {
		await cancelConsultation(id);
	}
	return res.status(200).json({ message: 'Consultation cancelled' });
};
