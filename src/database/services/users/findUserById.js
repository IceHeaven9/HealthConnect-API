import { Db } from './structure/db.js';

// Funcion para obtener los datos de un usuario por id

export async function findUserById(id) {
	const [[user]] = await Db.query('SELECT * FROM users WHERE id = :id', {
		id,
	});

	const [specialities] = await Db.query(
		`SELECT s.id 
		 FROM user_specialities us
		 JOIN specialities s ON us.specialityId = s.id
		 WHERE us.userId = :id`,
		{
			id,
		}
	);
	user.specialities = specialities.map((row) => row.id);

	return user;
}
