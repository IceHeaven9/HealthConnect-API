import { Db } from '../../structure/db.js';

// Funcion para obtener las especialidad por ID

export async function getSpecialitiesById(id) {
	const [speciality] = await Db.query(
		'SELECT * FROM specialities WHERE id = ?;',
		[id]
	);
	return speciality[0];
}
