import { Db } from '../../structure/db.js';

// Funcion para actualizar la biografia de un usuario
export const updateBiography = async (id, biography) => {
	await Db.query(`UPDATE users SET biography =? WHERE id =?`, [biography, id]);
};
