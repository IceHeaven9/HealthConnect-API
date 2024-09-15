import { Db } from '../../structure/db.js';

// Función para obtener una respuesta por id

export const getResponseById = async (id) => {
	const [rows] = await Db.query(
		`SELECT responses.*, files_responses.fileName, files_responses.filePath 
        FROM responses 
        LEFT JOIN files_responses ON responses.id = files_responses.responseId 
        WHERE responses.id = ?`,
		[id]
	);
	return rows[0];
};
