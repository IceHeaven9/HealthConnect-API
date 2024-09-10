// Controlador para actualizar el perfil del usuario

import {
	updateBiography,
	updateExperience,
	updateFirstName,
	updateLastName,
	updateUserName,
} from '../../database/users.js';
import { parseUpdateProfilePayload } from '../../validations/users.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const updateProfileController = async (req, res) => {
	const { firstName, lastName, userName, biography, experience } =
		parseUpdateProfilePayload(req.body);
	const userId = req.currentUser.id;
	const { id } = req.params;

	if (!id || !userId) {
		throw generateErrors(404, 'NOT_FOUND', 'Id no encontrado');
	}
	if (id != userId) {
		throw generateErrors(403, 'FORBIDDEN', 'No autorizado');
	}

	await updateFirstName(id, firstName);

	await updateLastName(id, lastName);

	await updateUserName(id, userName);

	await updateBiography(id, biography);

	await updateExperience(id, experience);

	res.status(200).json({ message: 'Perfil actualizado exitosamente' });
};
