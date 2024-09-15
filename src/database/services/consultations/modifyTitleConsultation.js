import { Db } from './structure/db.js';

// Funcion para modificar el title de una consulta

export const modifyTitleConsultation = async (id, title) => {
	const modify = await Db.query(
		'UPDATE consultations SET title = ? WHERE id = ?',
		[title, id]
	);
	return modify;
};
