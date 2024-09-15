import { Db } from './structure/db.js';

// Funcion para actualizar el apellido de un usuario
export const updateLastName = async (id, lastName) => {
	await Db.query(`UPDATE users SET lastName =? WHERE id =?`, [lastName, id]);
};
