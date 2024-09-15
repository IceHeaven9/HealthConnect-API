import { Db } from './structure/db.js';

// Funcion para quitar el codigo de validacion de un usuario

export async function removeValidationCodeFromUser(userId) {
	await Db.query('UPDATE users SET validationCode = NULL WHERE id = :userId', {
		userId,
	});
}
