import { Db } from './structure/db.js';

// Funcion para insertar el validation code de un usuario en la base de datos

export const setRecoveryPasswordCode = async (userId, recoveryPasswordCode) => {
	const query = 'UPDATE users SET recoveryPasswordCode = ? WHERE id = ?';
	const [result] = await Db.query(query, [recoveryPasswordCode, userId]);
	return result;
};
