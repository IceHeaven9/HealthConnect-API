// controlador para insertar un rating a una respuesta

import { getResponseById, setRating } from '../../database/responses.js';
import { parseRatingPayload } from '../../validations/responses.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const setRatingController = async (req, res) => {
	const { id } = req.params;
	const { rating } = parseRatingPayload(req.body);
	const response = await getResponseById(id);

	if (!response) {
		throw generateErrors(404, 'NO_ENCONTRADO', 'Respuesta no encontrada');
	}

	if (response.rating) {
		throw generateErrors(
			400,
			'SOLICITUD_ERRONEA',
			'La respuesta ya ha sido valorada'
		);
	}

	await setRating(id, rating);
	res.status(200).json({ message: 'Rating actualizado con éxito' });
};
