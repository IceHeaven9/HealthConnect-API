import {
	createConsultation,
	getConsultationByDateAndPatientId,
	getConsultationsByDateAndDoctorId,
	setDoctorId,
} from '../../database/consultation.js';
import { generateErrors } from '../../utils/generateErrors.js';
import { parseConsultationPayload } from '../../validations/consultations.js';

// Controlador para crear una consulta

export const createConsultationController = async (req, res) => {
	const { title, description, severity, specialityid, doctorId, date } =
		parseConsultationPayload(req.body);
	const user = req.currentUser;
	const id = user.id;

	// Verificar si el usuario es un paciente
	if (user.userType !== 'patient') {
		throw generateErrors(
			403,
			'UNAUTHORIZED',
			'los medicos no pueden crear citas'
		);
	}

	// Verificar si el paciente ya tiene una consulta en esa fecha

	const existingPatientConsultation = await getConsultationByDateAndPatientId(
		date,
		id
	);
	if (existingPatientConsultation) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'El paciente ya tiene una consulta en esa fecha'
		);
	}

	// Verificar si el doctor ya tiene una consulta en esa fecha
	if (doctorId) {
		const existingDoctorConsultation = await getConsultationsByDateAndDoctorId(
			date,
			doctorId
		);
		if (existingDoctorConsultation) {
			throw generateErrors(
				400,
				'BAD_REQUEST',
				'El doctor ya tiene una consulta en esa fecha'
			);
		}
	}

	// Crear la consulta
	const idConsultation = await createConsultation({
		title,
		description,
		severity,
		specialityid,
		patientId: id,
		doctorId,
		date,
	});
	const affectedRows = await setDoctorId(doctorId, idConsultation);
	if (affectedRows === 0) {
		throw generateErrors(400, 'DOCTOR_NOT_FOUND', 'Médico no encontrado');
	}

	res.status(201).json({ mensaje: 'Cita creada', id: idConsultation });
};
