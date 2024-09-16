import { getConsultationById } from '../../database/services/consultations/getConsultationById.js';
import { setResponse } from '../../database/services/responses/setResponse.js';
import { getResponsesByConsultationId } from '../../database/services/responses/getResponsesByConsultationId.js';
import { findUserById } from '../../database/services/users/findUserById.js';
import { parseResponsePayload } from '../../validations/responses/parseResponsePayload.js';
import { generateErrors } from '../../utils/generateErrors.js';
import { editResponse } from '../../database/services/responses/editResponse.js';

// Controlador para crear respuestas

export const createResponsesController = async (req, res) => {
	const { id } = req.params;
	const { content, rating } = parseResponsePayload(req.body);
	const userId = req.currentUser.id;
	const user = await findUserById(userId);
	const userType = user.userType;
	const [consultation] = await getConsultationById(id);
	const [response] = await getResponsesByConsultationId(id);

	if (!consultation) {
		throw generateErrors(404, 'NOT_FOUND', 'Consulta no encontrada');
	}

	if (userType === 'doctor' && consultation.doctorId !== user.id) {
		throw generateErrors(403, 'FORBIDDEN', 'No autorizado');
	}

	if (response) {
		await editResponse(response.consultationId, content);
		res.status(200).json({ message: 'Respuesta actualizada con éxito' });
		return;
	}
	await setResponse(content, id, userId, rating);

	res.status(201).json({ message: 'Respuesta creada exitosamente' });
};
