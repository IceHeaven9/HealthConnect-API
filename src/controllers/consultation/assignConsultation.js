import { assignDoctorToConsultation } from '../../database/consultation.js';

export const assignConsultationController = async (req, res) => {
	const doctorid = req.currentUser.id;
	const { consultationId } = req.body;
	const setDoctor = await assignDoctorToConsultation(doctorid, consultationId);
	if (!setDoctor) {
		throw generateErrors(400, 'DOCTOR_NOT_FOUND', 'Médico no encontrado');
	}
	res.status(200).json({ message: 'Consulta asignada' });
};
