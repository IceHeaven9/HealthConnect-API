import { Db } from '../../structure/db.js';

// Funcion para cancelar una consulta

export const cancelConsultation = async (id) => {
	const result = await Db.query(
		'UPDATE consultations SET status = "cancelled" WHERE id = ?',
		[id]
	);
	return result;
};
