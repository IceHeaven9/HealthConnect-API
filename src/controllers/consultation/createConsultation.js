import {
	createConsultation,
	setDoctorId,
} from '../../database/consultation.js';
import { generateErrors } from '../../utils/generateErrors.js';
import { parseConsultationPayload } from '../../validations/consultations.js';

// Controlador para crear una consulta

export const createConsultationController = async (req, res) => {
	const { title, description, severity, specialityid, doctorid, date } =
		parseConsultationPayload(req.body);
	const user = req.currentUser;
	const id = user.id;

	if (user.userType !== 'patient') {
		throw generateErrors(
			403,
			'UNAUTHORIZED',
			'los medicos no pueden crear citas'
		);
	}

	const idConsultation = await createConsultation({
		title,
		description,
		severity,
		specialityid,
		id,
		date,
	});

	if (doctorid) {
		await setDoctorId(idConsultation, doctorid);
	}

	res.status(201).json({ mensaje: 'Cita creada', id: idConsultation });
};
