import fs from 'fs/promises';
import path from 'path';
import { PUBLIC_DIR } from '../../../constants.js';
import { generateErrors } from '../../utils/generateErrors.js';
import {
	deleteResponseFile,
	getResponsesByConsultationId,
} from '../../database/responses.js';

export const deleteResponseFileController = async (req, res) => {
	const user = req.currentUser;
	const { consultationId, fileName } = req.params;

	const [response] = await getResponsesByConsultationId(consultationId);

	// Verificar si la respuesta existe
	if (!response) {
		throw generateErrors(404, 'NOT_FOUND', 'Respuesta no encontrada');
	}

	// Verificar si el usuario actual es el doctor que creó la respuesta
	if (user.id !== response.doctorId) {
		throw generateErrors(
			403,
			'SERVER_ERROR',
			'No tienes permisos para acceder a esta respuesta'
		);
	}

	// Eliminar el archivo del sistema de archivos
	const filePath = path.join(
		PUBLIC_DIR,
		'responseFiles',
		user.id.toString(),
		fileName
	);

	try {
		await fs.access(filePath);
		await fs.unlink(filePath);
	} catch (error) {
		if (error.code === 'ENOENT') {
			throw generateErrors(404, 'NOT_FOUND', 'El archivo no existe');
		} else {
			throw error;
		}
	}

	// Eliminar el archivo de la base de datos
	const result = await deleteResponseFile(response.id, fileName);

	if (result.affectedRows > 0) {
		res.status(200).json({ message: 'Archivo eliminado exitosamente' });
	} else {
		throw generateErrors(
			500,
			'SERVER_ERROR',
			'Error al eliminar el archivo de la base de datos'
		);
	}
};
