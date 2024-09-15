// Controlador para editar una respuesta a una consulta (sólo el doctor puede hacerlo, y solo si está sin valorar)
// Recuperamos la respuesta por su id, comprobamos que el doctor es el que la ha creado, y que la consulta no ha sido valorada

import { getResponsesByConsultationId } from '../../database/services/responses/getResponsesByConsultationId.js';
import { editResponse } from '../../database/services/responses/editResponse.js';
import { parseEditResponsePayload } from '../../validations/responses/parseEditResponsePayload.js';
import { generateErrors } from '../../utils/generateErrors.js';
import { getConsultationById } from '../../database/services/consultations/getConsultationById.js';

export const editResponseController = async (req, res) => {
	const { id } = req.params;
	const user = req.currentUser;
	const { content } = parseEditResponsePayload(req.body);
	const [consultation] = await getConsultationById(id);
	const [response] = await getResponsesByConsultationId(id);

	if (!consultation) {
		throw generateErrors(404, 'NO_ENCONTRADO', 'Consulta no encontrada');
	}

	if (!response) {
		throw generateErrors(404, 'NO_ENCONTRADO', 'Respuesta no encontrada');
	}

	if (consultation.doctorId !== user.id) {
		throw generateErrors(403, 'PROHIBIDO', 'No autorizado');
	}

	if (response.rating !== null) {
		throw generateErrors(
			400,
			'SOLICITUD_ERRONEA',
			'No se puede modificar una respuesta ya valorada'
		);
	}

	await editResponse(response.consultationId, content);
	res.status(200).json({ message: 'Respuesta actualizada con éxito' });
};
