import {
	createConsultation,
	getConsultationByDateAndPatientId,
	getConsultationsByDateAndDoctorId,
	setDoctorId,
} from '../../database/consultation.js';
import { generateErrors } from '../../utils/generateErrors.js';
import { infoLog, succesLog } from '../../utils/logger.js';
import { parseConsultationPayload } from '../../validations/consultations.js';

// Controlador para crear una consulta

export const createConsultationController = async (req, res) => {
	const { title, description, severity, specialityid, doctorId, date } =
		parseConsultationPayload(req.body);

	infoLog('Creando consulta...');

	// Convertir la fecha a UTC y sumar una hora
	const utcDate = new Date(new Date(date).getTime() + 60 * 60 * 1000)
		.toISOString()
		.slice(0, 19)
		.replace('T', ' ');

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
		utcDate,
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
			utcDate,
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
	const consultationId = await createConsultation({
		title,
		description,
		severity,
		specialityid,
		patientId: id,
		date: utcDate,
	});

	// Asignar el doctor a la consulta si se proporciona su ID
	if (doctorId) await setDoctorId(doctorId, consultationId);

	succesLog('Consulta creada con éxito!');
	res.status(201).json({ mensaje: 'Cita creada', id: consultationId });
};
