import { Db } from '../../structure/db.js';

// Funcion para actualizar la información completa de un usuario
export const updateUserById = async (
	id,
	firstName,
	lastName,
	userName,
	biography,
	experience
) => {
	await Db.query(
		`UPDATE users SET firstName =?, lastName =?, userName =?, biography =?, experience =? WHERE id =?`,
		[firstName, lastName, userName, biography, experience, id]
	);
};
