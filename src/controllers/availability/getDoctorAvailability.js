import { generateErrors } from '../../utils/generateErrors.js';
import {
	availabilityDoctors,
	availabilityConsultations as availabilityConsultations,
} from '../../database/availability.js';

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
			.map((hour) => {
				const period = hour >= 12 ? 'PM' : 'AM';
				const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
				return `${formattedHour.toString().padStart(2, '0')}:00 ${period}`;
			}); // Formato 00:00 AM/PM
		return {
			doctorId: doctor.id,
			doctorName: `${doctor.firstName} ${doctor.lastName}`,
			freeHours,
		};
	});

	res.status(200).json(availability);
};
