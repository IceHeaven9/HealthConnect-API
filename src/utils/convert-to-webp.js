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
