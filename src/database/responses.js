import { Db } from './structure/db.js';

// Función para obtener una respuesta por id

export const getResponseById = async (id) => {
	const [rows] = await Db.query(
		`SELECT responses.*, files_responses.fileName, files_responses.filePath 
        FROM responses 
        LEFT JOIN files_responses ON responses.id = files_responses.responseId 
        WHERE responses.id = ?`,
		[id]
	);
	return rows[0];
};
// Funcion para crear una respuesta

export const setResponse = async (content, id) => {
	const newResponse = await Db.query(
		`INSERT INTO responses (content, consultationId) VALUES (:content, :id)`,
		{ content, id }
	);

	return newResponse;
};

// Funcion para editar una respuesta

export const editResponse = async (consultationId, content) => {
	const editedResponse = await Db.query(
		'UPDATE responses SET content = ? WHERE consultationId = ?',
		[content, consultationId]
	);

	return editedResponse;
};

// Función para insertar un rating en una respuesta

export const setRating = async (consultationId, rating) => {
	const newRating = await Db.query(
		'UPDATE responses SET rating = ? WHERE consultationId = ?',
		[rating, consultationId]
	);

	return newRating;
};

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

// Función para obtener una respuesta por id

export const findResponseById = async (responseId) => {
	const query = 'SELECT * FROM responses WHERE id = ?';
	const [rows] = await Db.query(query, [responseId]);
	return rows[0];
};

// Función para borrar un archivo de respuesta

export const deleteResponseFile = async (responseId, fileName) => {
	const query =
		'DELETE FROM files_responses WHERE responseId = ? AND fileName = ?';
	const [result] = await Db.query(query, [responseId, fileName]);
	return result;
};

// Funcion para obtener las respuestas de una consulta
export const getResponsesByConsultationId = async (id) => {
	const query = `SELECT responses.*, files_responses.fileName, files_responses.filePath, consultations.doctorId 
        FROM responses 
        LEFT JOIN files_responses ON responses.id = files_responses.responseId 
        LEFT JOIN consultations ON responses.consultationId = consultations.id
        WHERE responses.consultationId = ?`;
	const [rows] = await Db.query(query, [id]);

	// Eliminar duplicados
	const uniqueResponses = Array.from(
		new Set(rows.map((r) => JSON.stringify(r)))
	).map((str) => JSON.parse(str));

	return uniqueResponses;
};
