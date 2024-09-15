import { Db } from '../../structure/db.js';

// Funcion para obtener los archivos de una respuesta por su id

export const getResponseFilesByResponseId = async (responseId) => {
	const query =
		'SELECT fileName, filePath FROM files_responses WHERE responseId = ?';
	const [rows] = await Db.query(query, [responseId]);
	return rows || null;
};
