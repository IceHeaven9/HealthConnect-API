// Controlador para editar una respuesta a una consulta (sólo el doctor puede hacerlo, y solo si está sin valorar)
// Recuperamos la respuesta por su id, comprobamos que el doctor es el que la ha creado, y que la consulta no ha sido valorada

import { editResponse } from '../../database/responses.js';
import { parseEditResponsePayload } from '../../validations/responses.js';
import { generateErrors } from '../../utils/generateErrors.js';
import { getConsultationById } from '../../database/consultation.js';

export const editResponseController = async (req, res) => {
	const { id } = req.params;
	const user = req.currentUser;
	const { content } = parseEditResponsePayload(req.body);
	const [consultation] = await getConsultationById(id);

	console.log(consultation);
	if (!consultation) {
		throw generateErrors(404, 'NO_ENCONTRADO', 'Consulta no encontrada');
	}

	if (consultation.doctorId !== user.id) {
		throw generateErrors(403, 'PROHIBIDO', 'No autorizado');
	}

	if (consultation.rating !== null) {
		throw generateErrors(400, 'SOLICITUD_ERRONEA', 'Respuesta ya evaluada');
	}

	if (content) {
		await editResponse(id, content);
		res.status(200).json({ message: 'Respuesta actualizada con éxito' });
	}
};
