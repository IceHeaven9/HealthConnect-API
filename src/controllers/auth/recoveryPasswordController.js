import { setRecoveryPasswordCode } from '../../database/services/users/setRecoveryPasswordCode.js';
import { findUserByEmail } from '../../database/services/users/findUserByEmail.js';
import { sendResetPasswordEmail } from '../../emails/recoveryPasswordEmail.js';
import { parseRecoveryPasswordPayload } from '../../validations/auth/parseRecoveryPasswordPayload.js';
import { generateErrors } from '../../utils/generateErrors.js';
import crypto from 'crypto';

// Controlador para recuperar la contraseña

export const recoveryPasswordController = async (req, res) => {
	const { email } = parseRecoveryPasswordPayload(req.body);

	// Busca el usuario por correo electrónico
	const user = await findUserByEmail(email);
	if (!user) {
		throw generateErrors(404, 'NOT_FOUND', 'Usuario no encontrado');
	}

	const recoveryPasswordCode = crypto.randomInt(100000, 999999);

	await setRecoveryPasswordCode(user.id, recoveryPasswordCode);

	await sendResetPasswordEmail(email, recoveryPasswordCode);

	res.status(200).json({
		message:
			'Se ha enviado un correo con instrucciones para restablecer tu contraseña',
	});
};
