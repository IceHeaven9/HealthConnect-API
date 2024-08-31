import path from 'path';
import fs from 'fs/promises';
import { generateErrors } from "../../utils/generateErrors.js";
import {convertImageToWebp} from '../../utils/convert-to-webp.js';
import { getConsultationById, uploadConsultationFiles } from '../../database/consultation.js';
import { PUBLIC_DIR } from '../../../constants.js';

const allowedMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


export const uploadConsultationFilesController = async (req, res) => {
  const id = req.params.id;
  const user = req.currentUser;
  const files = req.files; // No desestructuramos aquí

  if (user.userType !== 'paciente') {
    throw generateErrors(403, 'SERVER_ERROR', 'No tienes permisos para acceder');
  }

  const [consultation] = await getConsultationById(id);
  if (!consultation) {
    throw generateErrors(404, 'SERVER_ERROR', 'Consulta no encontrada');
  }

  if (consultation.patientId !== user.id) {
    throw generateErrors(403, 'SERVER_ERROR', 'No tienes permisos para acceder a esta consulta');
  }

  if (!files || Object.keys(files).length === 0) {
    throw generateErrors(400, 'SERVER_ERROR', 'No hay archivos adjuntos');
  }

  const fileEntries = Object.values(files); // Aquí obtenemos los archivos


  const uploadPromises = fileEntries.map(async (file) => {
    const mimeType = file.mimetype;
    if (!allowedMimeTypes.includes(mimeType)) {
      throw generateErrors(400, 'SERVER_ERROR', `Tipo de archivo no permitido: ${mimeType}`);
    }
    if (file.size > MAX_FILE_SIZE) {
      throw generateErrors(400, 'SERVER_ERROR', 'El archivo excede el tamaño máximo permitido de 5MB');
    }

    const userDir = path.join(PUBLIC_DIR, 'files', user.id.toString());
    await fs.mkdir(userDir, { recursive: true });

    const fileExtension = mimeType.startsWith('image/') ? '.webp' : path.extname(file.name);
    const fileName = `${id}-${crypto.randomUUID()}${fileExtension}`;
    const filePath = path.join(userDir, fileName);

    try {
      if (mimeType.startsWith('image/')) {
        // Convertir la imagen a formato webp
        const imageBuffer = await convertImageToWebp(file.data);
        await fs.writeFile(filePath, imageBuffer);
      } else {
        // Guardar otros tipos de archivos sin cambios
        await fs.writeFile(filePath, file.data);
      }
    } catch (error) {
      // Limpiar recursos temporales en caso de error
      await fs.unlink(filePath);
      throw error;
    }

    return { fileName, filePath };
  });

  const uploadFiles = await Promise.all(uploadPromises);

  const uploadedFiles = await uploadConsultationFiles(id, uploadFiles);

  res.status(200).json({
    message: 'Archivos subidos exitosamente',
    files: uploadedFiles
  });
};