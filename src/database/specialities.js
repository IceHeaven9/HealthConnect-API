import { Db } from './structure/db.js';

// Funcion para obtener las especialidades

export const getSpecialities = async () => {
	const specialities = await Db.query(`SELECT id, name FROM specialities;`);

	return specialities;
};

// Funcion para obtener las especialidades por IDs
export async function findSpecialitiesByIds(specialityIds) {
	const [rows] = await Db.query('SELECT id FROM specialities WHERE id IN (?)', [
		specialityIds,
	]);

	return rows;
}
