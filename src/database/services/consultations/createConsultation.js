import { Db } from '../../structure/db.js';

// Funcion para crear una consulta

export const createConsultation = async ({
	title,
	description,
	severity,
	specialityid,
	patientId,
	date,
}) => {
	const [result] = await Db.query(
		`INSERT INTO consultations (date, title, description, severity, specialityid, patientId) VALUES (?, ?, ?, ?, ?, ?)`,
		[date, title, description, severity, specialityid, patientId]
	);
	return result.insertId;
};
