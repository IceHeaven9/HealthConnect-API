import { Db } from './structure/db.js';

// Función para insertar archivos a una consulta

export const uploadConsultationFiles = async (id, files) => {
	const insertPromises = files.map(async ({ fileName, filePath }) => {
		await Db.query(
			'INSERT INTO files_consultations (consultationId, fileName, filePath) VALUES (?, ?, ?)',
			[id, fileName, filePath]
		);
		return { fileName, filePath };
	});

	return await Promise.all(insertPromises);
};
