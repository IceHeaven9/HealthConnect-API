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

export const setResponse = async (content, id, userId, rating) => {
	const newResponse = await Db.query(
		`INSERT INTO responses (content, consultationId, doctorId, rating) VALUES (:content, :id, :userId, :rating)`,
		{ content, id, userId, rating }
	);

	return newResponse;
};

// Funcion para editar una respuesta

export const editResponse = async (id, content) => {
	const editedResponse = await Db.query(
		'UPDATE responses SET content = ? WHERE id = ?',
		[content, id]
	);

	return editedResponse;
};

// Función para insertar un rating en una respuesta

export const setRating = async (id, rating) => {
	const newRating = await Db.query(
		'UPDATE responses SET rating = ? WHERE id = ?',
		[rating, id]
	);

	return newRating;
};

export const uploadResponseFiles = async (responseId, files) => {
  const query = 'INSERT INTO files_responses (responseId, fileName, filePath) VALUES ?';
  const values = files.map(file => [responseId, file.fileName, file.filePath]);
  await Db.query(query, [values]);
  return files.map(file => ({ fileName: file.fileName, filePath: file.filePath }));
};

export const findResponseById = async (responseId) => {
  const query = 'SELECT * FROM responses WHERE id = ?';
  const [rows] = await Db.query(query, [responseId]);
  return rows[0];
};