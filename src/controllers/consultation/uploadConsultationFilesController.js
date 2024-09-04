import path from 'path';
import fs from 'fs/promises';
import { generateErrors } from '../../utils/generateErrors.js';
import { convertImageToWebp } from '../../utils/convertToWebp.js';
import {
	getConsultationById,
	uploadConsultationFiles,
} from '../../database/consultation.js';
import { PUBLIC_DIR } from '../../../constants.js';
import { allowedMimeTypes } from '../../validations/consultations.js';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const uploadConsultationFilesController = async (req, res) => {
	const id = req.params.id;
	const user = req.currentUser;
	const files = req.files.files;

	if (user.userType !== 'patient') {
		throw generateErrors(
			403,
			'SERVER_ERROR',
			'No tienes permisos para acceder'
		);
	}

	const [consultation] = await getConsultationById(id);
	if (!consultation) {
		throw generateErrors(404, 'SERVER_ERROR', 'Consulta no encontrada');
	}

	if (consultation.patientId !== user.id) {
		throw generateErrors(
			403,
			'SERVER_ERROR',
			'No tienes permisos para acceder a esta consulta'
		);
	}

	if (!files || Object.keys(files).length === 0) {
		throw generateErrors(400, 'SERVER_ERROR', 'No hay archivos adjuntos');
	}

	const fileEntries = Array.isArray(files) ? files : [files];

	const uploadPromises = fileEntries.map(async (file) => {
		const mimeType = file.mimetype;
		if (!mimeType) {
			throw generateErrors(400, 'SERVER_ERROR', 'El archivo no tiene mimeType');
		}
		if (!allowedMimeTypes.includes(mimeType)) {
			throw generateErrors(
				400,
				'SERVER_ERROR',
				`Tipo de archivo no permitido: ${mimeType}`
			);
		}
		if (file.size > MAX_FILE_SIZE) {
			throw generateErrors(
				400,
				'SERVER_ERROR',
				'El archivo excede el tamaño máximo permitido de 5MB'
			);
		}

		const userDir = path.join(
			PUBLIC_DIR,
			'consultationFiles',
			user.id.toString()
		);
		await fs.mkdir(userDir, { recursive: true });

		const fileExtension = mimeType.startsWith('image/')
			? '.webp'
			: path.extname(file.name);
		const fileName = `${id}-${user.id}${crypto.randomUUID()}${fileExtension}`;
		const filePath = path.join(userDir, fileName);

		try {
			if (mimeType.startsWith('image/')) {
				const imageBuffer = await convertImageToWebp(file.data);
				await fs.writeFile(filePath, imageBuffer);
			} else {
				await fs.writeFile(filePath, file.data);
			}
		} catch (error) {
			await fs.unlink(filePath);
			throw error;
		}

		return { fileName, filePath };
	});

	const uploadFiles = await Promise.all(uploadPromises);

	const uploadedFiles = await uploadConsultationFiles(id, uploadFiles);

	res.status(200).json({
		message: 'Archivos subidos exitosamente',
		files: uploadedFiles,
	});
};
