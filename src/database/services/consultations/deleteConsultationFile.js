import { Db } from '../../structure/db.js';

//   Funcion para borrar archivos de una consulta

export const deleteConsultationFile = async (consultationId, fileName) => {
	const query =
		'DELETE FROM files_consultations WHERE consultationId = ? AND fileName = ?';
	const [result] = await Db.query(query, [consultationId, fileName]);
	return result;
};
