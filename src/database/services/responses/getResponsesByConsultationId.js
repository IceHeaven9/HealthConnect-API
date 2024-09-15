import { Db } from '../../structure/db.js';

// Funcion para obtener las respuestas de una consulta
export const getResponsesByConsultationId = async (id) => {
	const query = `SELECT responses.*, files_responses.fileName, files_responses.filePath, consultations.doctorId 
        FROM responses 
        LEFT JOIN files_responses ON responses.id = files_responses.responseId 
        LEFT JOIN consultations ON responses.consultationId = consultations.id
        WHERE responses.consultationId = ?`;
	const [rows] = await Db.query(query, [id]);
	return rows;
};
