import sharp from "sharp";

export async function convertAvatarToWebp(buffer) {
	return await sharp(buffer)
		.resize({
			width: 256,
		})
		.webp({ quality: 80 })
		.toBuffer();
}
