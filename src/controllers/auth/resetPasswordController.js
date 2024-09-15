import { setRecoveryPasswordCodeToNull } from '../../database/services/users/setRecoveryPasswordCodeToNull.js';
import { setNewPassword } from '../../database/services/users/setNewPassword.js';
import { getUserByRecoveryPasswordCode } from '../../database/services/users/getUserByRecoveryPasswordCode.js';
import { parseResetPasswordPayload } from '../../validations/auth.js';
import { generateErrors } from '../../utils/generateErrors.js';

// Controlador para restablecer la contraseña

export const resetPasswordController = async (req, res) => {
	const { password1, password2, recoveryPasswordCode } =
		parseResetPasswordPayload(req.body);

	// Busca al usuario por el token
	const [user] = await getUserByRecoveryPasswordCode(recoveryPasswordCode);
	if (!user || user.length === 0) {
		throw generateErrors(400, 'BAD_REQUEST', 'Código inválido o expirado');
	}

	// Establece la nueva contraseña
	await setNewPassword(password1, user.id);

	// Setear el recoveryPasswordCode a null para que no se pueda volver a usar
	await setRecoveryPasswordCodeToNull(user.id);

	res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
};
