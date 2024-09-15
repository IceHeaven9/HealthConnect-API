import { generateErrors } from '../../utils/generateErrors.js';
import { availabilityDoctors } from '../../database/services/availability/availabilityDoctors.js';
import { availabilityConsultations } from '../../database/services/availability/availabilityConsultations.js';

export const getDoctorAvailability = async (req, res) => {
	const { specialityId, date, doctorId } = req.query;

	if (!specialityId || !date) {
		throw generateErrors(
			400,
			'BAD-REQUEST',
			'Missing required parameters: specialityId and date'
		);
	}

	let doctors;
	if (doctorId) {
		// Obtener el doctor específico
		doctors = await availabilityDoctors(specialityId, doctorId);
	} else {
		// Obtener todos los doctores de la especialidad
		doctors = await availabilityDoctors(specialityId);
	}

	if (doctors.length === 0) {
		throw generateErrors(
			404,
			'FORBIDDEN',
			'No doctors found for the specified speciality'
		);
	}

	// Obtener todas las consultas de los doctores para la fecha dada
	const consultations = await availabilityConsultations(specialityId, date);

	// Lógica para determinar las horas libres
	const availability = doctors.map((doctor) => {
		const doctorConsultations = consultations.filter(
			(c) => c.doctorId === doctor.id
		);
		const bookedHours = doctorConsultations.map((c) =>
			new Date(c.date).getHours()
		);
		const freeHours = Array.from({ length: 7 }, (_, i) => i + 9) // Horas de 9 AM a 3 PM
			.filter((hour) => !bookedHours.includes(hour))
			.map((hour) => `${hour.toString().padStart(2, '0')}:00 H`); // Formato 00:00
		return {
			doctorId: doctor.id,
			doctorName: `${doctor.firstName} ${doctor.lastName}`,
			avatar: doctor.avatar,
			freeHours,
		};
	});

	res.status(200).json(availability);
};
