import { Db } from '../../structure/db.js';

// Funcion para verificar que una especialidad este asignada a un usuario

export async function assignSpecialitiesToUser(userId, specialityIds) {
	const values = specialityIds.map((specialityId) => [userId, specialityId]);
	await Db.query(
		`INSERT INTO user_specialities (userId, specialityId) VALUES ?`,
		[values]
	);
}
