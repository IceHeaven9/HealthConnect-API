import { Db } from './structure/db.js';

// Funcion para obtener las consultas de un paciente ya pasadas y que aun tengan el status pending

export const getPendingConsultationsByPatientId = async (patientId) => {
	const query =
		'SELECT * FROM consultations WHERE patientId = ? AND status = "pending" AND date < NOW()';
	const [rows] = await Db.query(query, [patientId]);
	return rows || null;
};
