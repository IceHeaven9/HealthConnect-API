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
		throw generateErrors(404, 'NOT_FOUND', 'Id not found');
	}

	if (id != userId) {
		throw generateErrors(403, 'FORBIDDEN', 'Unauthorized');
	}

	if (firstName !== undefined) {
		await updateFirstName(id, firstName);
	}
	if (lastName !== undefined) {
		await updateLastName(id, lastName);
	}
	if (userName !== undefined) {
		await updateUserName(id, userName);
	}
	if (biography !== undefined) {
		await updateBiography(id, biography);
	}
	if (experience !== undefined) {
		await updateExperience(id, experience);
	}

	res.status(200).json({ message: 'Profile updated successfully' });
};
