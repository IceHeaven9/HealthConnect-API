// controlador para insertar un rating a una respuesta

import { getResponseById, setRating } from '../../database/responses.js';
import { parseRatingPayload } from '../../validations/responses.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const setRatingController = async (req, res) => {
	const { id } = req.params;
	const { rating } = parseRatingPayload(req.body);
	const user = req.currentUser;
	const response = await getResponseById(id);

	if (!response) {
		throw generateErrors(404, 'NOT_FOUND', 'respuesta no encontrada');
	}

	if (response.rating) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'la respuesta ya ha sido valorada'
		);
	}

	if (user.userType === 'doctor') {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'Los doctores no pueden valorar las consultas'
		);
	}

	await setRating(id, rating);
	res.status(200).json({ message: 'Rating updated successfully' });
};
