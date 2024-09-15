import { Db } from './structure/db.js';

// Funcion para obtener los datos de un usuario por su recovery password code

export const getUserByRecoveryPasswordCode = async (recoveryPasswordCode) => {
	const query = 'SELECT * FROM users WHERE recoveryPasswordCode = ? LIMIT 1';
	const [result] = await Db.query(query, [recoveryPasswordCode]);
	return result;
};
