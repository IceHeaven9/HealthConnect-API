import { Db } from './structure/db.js';

// Función para obtener las consultas de un paciente por su fecha

export const getConsultationByDateAndPatientId = async (date, patientId) => {
	const query = 'SELECT * FROM consultations WHERE date = ? AND patientId = ?';
	const [rows] = await Db.query(query, [date, patientId]);
	return rows[0] || null;
};
