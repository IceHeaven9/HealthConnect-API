import jwt from 'jsonwebtoken';
import { findUserById, setNewPassword } from '../../database/users.js';
import { JWT_SECRET } from '../../../constants.js';
import { parseResetPasswordPayload } from '../../validations/auth.js';
import { generateErrors } from '../../utils/generateErrors.js';

// Controlador para restablecer la contraseña

export const resetPasswordController = async (req, res) => {
	const { password1, password2 } = parseResetPasswordPayload(req.body);
	const { token } = req.params;

	const decode = jwt.verify(token, JWT_SECRET);

	// Busca al usuario por el token
	const user = await findUserById(decode.id);
	if (!user) {
		throw generateErrors(400, 'BAD_REQUEST', 'Token inválido o expirado');
	}

	// Establece la nueva contraseña
	await setNewPassword(password1, user.id);

	res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
};
