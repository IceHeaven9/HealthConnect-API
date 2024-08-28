import { Db } from './structure/db.js';

// Funcion para obtener las respuestas

export const setResponse = async (content, id, userId, rating) => {
	const newResponse = await Db.query(
		`INSERT INTO responses (content, consultationId, doctorId, rating) VALUES (:content, :id, :userId, :rating)`,
		{ content, id, userId, rating }
	);

	return newResponse;
};

// Funcion para modificar una respuesta (sólo el doctor puede hacerlo, y solo si está sin valorar)

export const updateResponse = async (content, id, userId, rating) => {
	const [rows] = await Db.query(`SELECT rating FROM responses WHERE id = :id`, {
		id,
	});

	if (rows.length === 0 || rows[0].rating !== null) {
		throw generateErrors(
			403,
			'SERVER_ERROR',
			'No puedes modificar una respuesta ya valorada'
		);
	}
if (rows[0].doctorId!== userId) {
	    throw generateErrors(
            403,
            'SERVER_ERROR',
            'No puedes modificar una respuesta que no es tuya'
        );

		if (
	const updatedResponse = await Db.query(
		`UPDATE responses SET content = :content, rating = :rating WHERE id = :id AND doctorId = :userId`,
		{ content, rating, id, userId }
	);

	if (updatedResponse.changedRows === 0) {
		throw generateErrors(
			404,
			'SERVER_ERROR',
			'Respuesta no encontrada o no es tuya'
		);
	}
	return updatedResponse;
};
