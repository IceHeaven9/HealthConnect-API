import {
	getConsultationById,
	deleteConsultationFile,
} from '../../database/consultation.js';
import fs from 'fs/promises';
import path from 'path';
import { PUBLIC_DIR } from '../../../constants.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const deleteConsultationFileController = async (req, res) => {
	const user = req.currentUser;
	const { id, fileName } = req.params;

	const [consultation] = await getConsultationById(id);

	if (user.id !== consultation.patientId) {
		throw generateErrors(
			403,
			'SERVER_ERROR',
			'No tienes permisos para acceder a esta consulta'
		);
	}

	const filePath = path.join(
		PUBLIC_DIR,
		'consultationFiles',
		user.id.toString(),
		fileName
	);

	await fs.unlink(filePath);

	const result = await deleteConsultationFile(id, fileName);

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
