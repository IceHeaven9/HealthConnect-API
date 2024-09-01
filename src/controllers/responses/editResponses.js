// Controlador para editar una respuesta a una consulta (sólo el doctor puede hacerlo, y solo si está sin valorar)
// Recuperamos la respuesta por su id, comprobamos que el doctor es el que la ha creado, y que la consulta no ha sido valorada

import { getResponseById, editResponse } from '../../database/responses.js';
import { parseEditResponsePayload } from '../../validations/responses.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const editResponseController = async (req, res) => {
	const { id } = req.params;
	const doctor = req.currentUser;
	const responseData = await getResponseById(id);
	const { content } = parseEditResponsePayload(req.body);

	if (!responseData) {
		throw generateErrors(404, 'NOT_FOUND', 'Response not found');
	}

	if (responseData.doctorId !== doctor.id) {
		throw generateErrors(403, 'FORBIDDEN', 'Unauthorized');
	}

	if (responseData.rating !== null) {
		throw generateErrors(400, 'BAD_REQUEST', 'Response already evaluated');
	}

	if (content) {
		await editResponse(id, content);
		res.status(200).json({ message: 'Response updated successfully' });
	}
};
