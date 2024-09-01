import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { findUserById, uploadUserAvatar } from '../../database/users.js';
import { convertAvatarToWebp } from '../../utils/convertToWebp.js';
import { API_HOST, PUBLIC_DIR } from '../../../constants.js';
import { parseImage } from '../../validations/images.js';
import { generateErrors } from '../../utils/generateErrors.js';

// Controlador para subir un avatar

export const uploadAvatarController = async (req, res) => {
	const files = req.files.avatarFile;
	parseImage(files);

	if (!files) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'No se ha proporcionado una imagen'
		);
	}

	const userProfile = await findUserById(req.currentUser.id);

	const originalBuffer = files.data;
	const imageBuffer = await convertAvatarToWebp(originalBuffer);
	const imageId = userProfile.avatar
		? path.basename(userProfile.avatar, '.webp')
		: crypto.randomUUID();
	const avatarURL = `/avatars/${imageId}.webp`;
	const filePath = path.join(PUBLIC_DIR, avatarURL);
	await fs.writeFile(filePath, imageBuffer);

	await uploadUserAvatar(req.currentUser.id, API_HOST + avatarURL);

	res.status(200).json({
		message: 'Avatar subido exitosamente',
		avatarURL: API_HOST + avatarURL,
	});
};
