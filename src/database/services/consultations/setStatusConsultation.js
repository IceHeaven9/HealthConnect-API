import { Db } from '../../structure/db.js';

// Funcion para cambiar el estado de una consulta

export const setStatusConsultation = async (id, status) => {
	const [consultation] = await Db.query(
		'UPDATE consultations SET status = ? WHERE id = ?',
		[status, id]
	);
	return consultation;
};
