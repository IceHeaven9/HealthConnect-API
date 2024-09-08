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

	console.log(response);

	if (user.id !== response.doctorId) {
		throw generateErrors(
			403,
			'SERVER_ERROR',
			'No tienes permisos para acceder a esta respuesta'
		);
	}

	const filePath = path.join(
		PUBLIC_DIR,
		'responseFiles',
		user.id.toString(),
		fileName
	);

	await fs.unlink(filePath);

	const result = await deleteResponseFile(response.consultationId, fileName);

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
