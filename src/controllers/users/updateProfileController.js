// Controlador para actualizar el perfil del usuario

import { findUserById, updateUserById } from '../../database/users.js';

export const updateProfileController = async (req, res) => {
	const { firstName, lastName, userName, biography, experience } = req.body;

	const userId = req.currentUser.id;
	const { id } = req.params;

	if (!id || !userId) {
		return res.status(404).json({ error: 'Id not found' });
	}

	console.log(id, userId);
	if (id != userId) {
		return res.status(403).json({ error: 'Unauthorized' });
	}

	const updateUser = await updateUserById(
		id,
		firstName,
		lastName,
		userName,
		biography,
		experience
	);
	res.status(200).json(updateUser);
};
