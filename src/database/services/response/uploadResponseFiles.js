import { Db } from './structure/db.js';

// Función para subir archivos de respuesta

export const uploadResponseFiles = async (responseId, files) => {
	const query =
		'INSERT INTO files_responses (responseId, fileName, filePath) VALUES ?';
	const values = files.map((file) => [
		responseId,
		file.fileName,
		file.filePath,
	]);
	await Db.query(query, [values]);
	return files.map((file) => ({
		fileName: file.fileName,
		filePath: file.filePath,
	}));
};
