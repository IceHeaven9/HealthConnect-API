export function parseImage(avatarFile) {
  if (!avatarFile) {
    return {
      success: false,
      message: "No se ha subido ningún archivo",
    };
  }

  const mimeType = avatarFile.mimetype;
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(mimeType)) {
    return {
      success: true,
      message: "El archivo es una imagen válida",
    };
  } else {
    return {
      success: false,
      message: "Tipo de archivo no permitido",
    };
  }
}
