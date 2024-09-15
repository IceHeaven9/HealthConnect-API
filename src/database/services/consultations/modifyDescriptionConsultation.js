import { Db } from './structure/db.js';

// Funcion para modificar la descripcion de una consulta

export const modifyDescriptionConsultation = async (id, description) => {
	const modify = await Db.query(
		'UPDATE consultations SET description = ? WHERE id = ?',
		[description, id]
	);
	return modify;
};
