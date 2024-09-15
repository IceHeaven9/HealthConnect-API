import { Db } from './structure/db.js';

// Funcion para actualizar la experiencia de un usuario
export const updateExperience = async (id, experience) => {
	await Db.query(`UPDATE users SET experience =? WHERE id =?`, [
		experience,
		id,
	]);
};
