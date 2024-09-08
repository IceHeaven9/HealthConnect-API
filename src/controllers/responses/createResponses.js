import { getConsultationById } from '../../database/consultation.js';
import {
	getResponsesByConsultationId,
	setResponse,
} from '../../database/responses.js';
import { findUserById } from '../../database/users.js';
import { parseResponsePayload } from '../../validations/responses.js';
import { generateErrors } from '../../utils/generateErrors.js';

// Controlador para crear respuestas

export const createResponsesController = async (req, res) => {
	const { id } = req.params;
	const { content, rating } = parseResponsePayload(req.body);
	const userId = req.currentUser.id;
	const user = await findUserById(userId);
	const userType = user.userType;
	const [consultation] = await getConsultationById(id);
	const response = await getResponsesByConsultationId(id);

	if (!consultation) {
		throw generateErrors(404, 'NOT_FOUND', 'Consulta no encontrada');
	}

	if (userType === 'doctor' && consultation.doctorId !== user.id) {
		throw generateErrors(403, 'FORBIDDEN', 'No autorizado');
	}

	if (response) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'La consulta ya tiene una respuesta'
		);
	}
	await setResponse(content, id, userId, rating);

	res.status(201).json({ message: 'Respuesta creada exitosamente' });
};
