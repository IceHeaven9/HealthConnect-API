import { Db } from './structure/db.js';

// Funcion para setear el validation code en null de un usuario en la base de datos

export const setRecoveryPasswordCodeToNull = async (userId) => {
	const query = 'UPDATE users SET recoveryPasswordCode = NULL WHERE id = ?';
	const [result] = await Db.query(query, [userId]);
	return result;
};
