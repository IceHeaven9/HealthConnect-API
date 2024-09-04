import {
	createConsultation,
	getConsultationByDateAndPatientId,
	getConsultationsByDateAndDoctorId,
	setDoctorId,
} from '../../database/consultation.js';
import { getSpecialitiesById } from '../../database/specialities.js';
import { getDoctorById } from '../../database/users.js';
import { generateErrors } from '../../utils/generateErrors.js';
import { parseConsultationPayload } from '../../validations/consultations.js';

// Controlador para crear una consulta

export const createConsultationController = async (req, res) => {
	const { title, description, severity, specialityid, doctorId, date } =
		parseConsultationPayload(req.body);

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

	// Verificar si el doctor existe y si su especialidad coincide con la especialidad de la consulta
	if (doctorId) {
		const doctor = await getDoctorById(doctorId);
		if (!doctor) {
			throw generateErrors(404, 'NOT_FOUND', 'Doctor no encontrado');
		}

		const speciality = await getSpecialitiesById(specialityid);
		if (!speciality) {
			throw generateErrors(404, 'NOT_FOUND', 'Especialidad no encontrada');
		}

		const nameSpeciality = speciality.name;
		const doctorSpecialities = doctor.specialities.split(', ');

		if (!doctorSpecialities.includes(nameSpeciality)) {
			throw generateErrors(
				400,
				'BAD_REQUEST',
				'La especialidad del doctor no coincide con la especialidad de la consulta'
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

	res.status(201).json({ mensaje: 'Cita creada', id: consultationId });
};
