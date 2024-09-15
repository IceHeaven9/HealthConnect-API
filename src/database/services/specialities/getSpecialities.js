import { Db } from '../../structure/db.js';

// Funcion para obtener las especialidades

export const getSpecialities = async () => {
	const specialities = await Db.query(`SELECT id, name FROM specialities;`);

	return specialities;
};
