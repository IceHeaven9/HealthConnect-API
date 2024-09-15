import { Db } from '../../structure/db.js';

// Función para insertar un rating en una respuesta

export const setRating = async (consultationId, rating) => {
	const newRating = await Db.query(
		'UPDATE responses SET rating = ? WHERE consultationId = ?',
		[rating, consultationId]
	);

	return newRating;
};
