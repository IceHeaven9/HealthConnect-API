import { Db } from './structure/db.js';

// Funcion para crear una respuesta

export const setResponse = async (content, id) => {
	const newResponse = await Db.query(
		`INSERT INTO responses (content, consultationId) VALUES (:content, :id)`,
		{ content, id }
	);

	return newResponse;
};
