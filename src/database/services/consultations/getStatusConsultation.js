import { Db } from '../../structure/db.js';

// Funcion para obtener el status de una consulta

export const getStatusConsultation = async (id) => {
	const getStatus = await Db.query(
		'SELECT status FROM consultations WHERE id = ?',
		[id]
	);
	return getStatus;
};
