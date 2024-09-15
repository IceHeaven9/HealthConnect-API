import { Db } from './structure/db.js';

// Función para borrar un archivo de respuesta

export const deleteResponseFile = async (responseId, fileName) => {
	const query =
		'DELETE FROM files_responses WHERE responseId = ? AND fileName = ?';
	const [result] = await Db.query(query, [responseId, fileName]);
	return result;
};
