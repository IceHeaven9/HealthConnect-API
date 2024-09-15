import { Db } from '../../structure/db.js';

// Funcion para obtener los datos de los usuarios por email

export async function findUserByEmail(email) {
	const [[user]] = await Db.query(`SELECT * FROM users WHERE email = :email`, {
		email: email,
	});
	return user;
}
