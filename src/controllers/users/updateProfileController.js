// Controlador para actualizar el perfil del usuario

import {
	updateBiography,
	updateExperience,
	updateFirstName,
	updateLastName,
	updateUserById,
	updateUserName,
} from '../../database/users.js';

export const updateProfileController = async (req, res) => {
	const { firstName, lastName, userName, biography, experience } = req.body;

	const userId = req.currentUser.id;
	const { id } = req.params;

	if (!id || !userId) {
		return res.status(404).json({ error: 'Id not found' });
	}

	if (id != userId) {
		return res.status(403).json({ error: 'Unauthorized' });
	}

	if (firstName && lastName && userName && biography && experience)
		await updateUserById(
			id,
			firstName,
			lastName,
			userName,
			biography,
			experience
		);

	if (firstName) {
		await updateFirstName(userId, firstName);
	}

	if (lastName) {
		await updateLastName(userId, lastName);
	}

	if (userName) {
		await updateUserName(userId, userName);
	}

	if (biography) {
		await updateBiography(userId, biography);
	}

	if (experience) {
		await updateExperience(userId, experience);
	}

	res.status(200).json(updateProfileController);
};
