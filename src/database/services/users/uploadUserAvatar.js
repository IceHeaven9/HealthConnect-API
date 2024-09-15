import { Db } from './structure/db.js';

// Funcion para subir un avatar a un usuario

export const uploadUserAvatar = async (userId, avatarPath) => {
	await Db.query('UPDATE users SET avatar = ? WHERE id = ?', [
		avatarPath,
		userId,
	]);
};
