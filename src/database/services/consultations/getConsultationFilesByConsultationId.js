import { Db } from './structure/db.js';

// Funcion para obtener los archivos de una consulta por su id

export const getConsultationFilesByConsultationId = async (consultationId) => {
	const query =
		'SELECT fileName, filePath FROM files_consultations WHERE consultationId = ?';
	const [rows] = await Db.query(query, [consultationId]);
	return rows || null;
};
