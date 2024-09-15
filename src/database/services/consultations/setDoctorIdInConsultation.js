import { Db } from './structure/db.js';

// Funcion para asignar un doctor a una consulta

export const setDoctorIdInConsultation = async (doctorId, consultationId) => {
	// Verificar si el doctorId existe en la tabla users
	const [[doctor]] = await Db.query(
		'SELECT id FROM users WHERE id = ? AND userType = "doctor"',
		[doctorId]
	);

	if (doctor.length === 0) {
		throw generateErrors(404, 'NOT_FOUND', 'Doctor no encontrado');
	}
	// Funcion para comprobar si la consulta ya tiene un doctor asignado

	const [[consultation]] = await Db.query(
		'SELECT doctorId FROM consultations WHERE id = ?',
		[consultationId]
	);

	if (consultation.doctorId !== null) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'La consulta ya tiene un doctor asignado'
		);
	}

	// Si el doctor existe, proceder con la actualización
	const [setDoctor] = await Db.query(
		'UPDATE consultations SET doctorId = ? WHERE id = ?',
		[doctorId, consultationId]
	);

	return setDoctor.affectedRows;
};
