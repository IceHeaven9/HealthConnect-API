import { hashPassword } from '../utils/hashPassword.js';
import { Db } from './structure/db.js';

// Funcion para setear una nueva contraseña a un usuario

export async function setNewPassword(password1, id) {
	const hashedPassword = await hashPassword(password1);
	await Db.query('UPDATE users SET password = :hashedPassword WHERE id = :id', {
		hashedPassword,
		id: id,
	});
}
