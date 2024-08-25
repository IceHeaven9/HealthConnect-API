import bcrypt from 'bcrypt';

// Función para hashear una contraseña

export async function hashPassword(password) {
	return await bcrypt.hash(password, 12);
}
