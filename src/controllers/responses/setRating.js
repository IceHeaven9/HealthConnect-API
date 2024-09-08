// controlador para insertar un rating a una respuesta

import {
	getResponsesByConsultationId,
	setRating,
} from '../../database/responses.js';
import { parseRatingPayload } from '../../validations/responses.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const setRatingController = async (req, res) => {
	const { id } = req.params;
	const { rating } = parseRatingPayload(req.body);
	const [response] = await getResponsesByConsultationId(id);

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

	if (String(response.consultationId) !== String(id)) {
		throw generateErrors(
			400,
			'SOLICITUD_ERRONEA',
			'La respuesta no pertenece a la consulta especificada'
		);
	}

	await setRating(response.consultationId, rating);
	res.status(200).json({ message: 'Rating actualizado con éxito' });
};
