import { Db } from './structure/db.js';

// Funcion para editar una respuesta

export const editResponse = async (consultationId, content) => {
	const editedResponse = await Db.query(
		'UPDATE responses SET content = ? WHERE consultationId = ?',
		[content, consultationId]
	);

	return editedResponse;
};
