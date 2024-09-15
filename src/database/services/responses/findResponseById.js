import { Db } from '../../structure/db.js';
// Función para obtener una respuesta por id

export const findResponseById = async (responseId) => {
	const query = 'SELECT * FROM responses WHERE id = ?';
	const [rows] = await Db.query(query, [responseId]);
	return rows[0];
};
