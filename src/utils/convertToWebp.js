import sharp from 'sharp';

// Función que recibe una imagen y la convierte a formato webp

export async function convertAvatarToWebp(buffer) {
	return await sharp(buffer)
		.resize({
			width: 256,
		})
		.webp({ quality: 80 })
		.toBuffer();
}

export async function convertImageToWebp(buffer) {
	return await sharp(buffer)
			.resize({
					width: 1024,
			})
			.webp({ quality: 80 })
			.toBuffer();
}