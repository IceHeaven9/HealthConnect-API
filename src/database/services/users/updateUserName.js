import { Db } from './structure/db.js';

// Funcion para actualizar el username de un usuario
export const updateUserName = async (id, userName) => {
	await Db.query(`UPDATE users SET userName =? WHERE id =?`, [userName, id]);
};
