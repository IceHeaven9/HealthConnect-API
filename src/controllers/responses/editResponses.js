// Controlador para editar una respuesta a una consulta (sólo el doctor puede hacerlo, y solo si está sin valorar)
// Recuperamos la respuesta por su id, comprobamos que el doctor es el que la ha creado, y que la consulta no ha sido valorada

import { getResponseById, editResponse } from '../../database/responses.js';

export const editResponseController = async (req, res) => {
	const { id } = req.params;
	const doctor = req.currentUser;
	const responseData = await getResponseById(id);
	const content = req.body.content;

	if (!responseData) {
		return res.status(404).json({ message: 'Response not found' });
	}

	if (responseData.doctorId !== doctor.id) {
		return res.status(403).json({ message: 'Unauthorized' });
	}

	if (responseData.rating !== null) {
		return res.status(400).json({ message: 'Response already evaluated' });
	}

	if (content) {
		await editResponse(id, content);
		res.status(200).json({ message: 'Response updated successfully' });
	}
};
