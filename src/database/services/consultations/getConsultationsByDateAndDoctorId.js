import { Db } from './structure/db.js';

// Funcion para obtener las consultas de un doctor por su fecha

export const getConsultationsByDateAndDoctorId = async (date, doctorId) => {
	const query = 'SELECT * FROM consultations WHERE date = ? AND doctorId = ?';
	const [rows] = await Db.query(query, [date, doctorId]);
	return rows[0] || null;
};
