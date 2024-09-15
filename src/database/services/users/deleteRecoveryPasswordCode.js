import { Db } from '../../structure/db.js';

// Funcion para borrar el validation code de un usuario en la base de datos

export const deleteRecoveryPasswordCode = async (userId) => {
	const query = 'UPDATE users SET recoveryPasswordCode = NULL WHERE id = ?';
	const [result] = await Db.query(query, [userId]);
	return result;
};
