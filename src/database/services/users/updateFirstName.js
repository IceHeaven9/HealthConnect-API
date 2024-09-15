import { Db } from '../../structure/db.js';

// Funcion para actualizar el nombre de un usuario
export const updateFirstName = async (id, firstName) => {
	await Db.query(`UPDATE users SET firstName =? WHERE id =?`, [firstName, id]);
};
