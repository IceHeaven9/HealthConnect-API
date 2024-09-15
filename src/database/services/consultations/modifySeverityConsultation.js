import { Db } from '../../structure/db.js';

// Funcion para modificar la severidad de una consulta

export const modifySeverityConsultation = async (id, severity) => {
	const modify = await Db.query(
		'UPDATE consultations SET severity = ? WHERE id = ?',
		[severity, id]
	);
	return modify;
};
