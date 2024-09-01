import { JWT_SECRET } from '../../../constants.js';
import { findUserByEmail } from '../../database/users.js';
import { sendResetPasswordEmail } from '../../emails/recoveryPasswordEmail.js';
import jwt from 'jsonwebtoken';
import { parseRecoveryPasswordPayload } from '../../validations/auth.js';
import { generateErrors } from '../../utils/generateErrors.js';

// Controlador para recuperar la contraseña

export const recoveryPasswordController = async (req, res) => {
	const { email } = parseRecoveryPasswordPayload(req.body);

	// Busca el usuario por correo electrónico
	const user = await findUserByEmail(email);
	if (!user) {
		throw generateErrors(404, 'NOT_FOUND', 'Usuario no encontrado');
	}

	// Genera un token único
	const token = jwt.sign(
		{
			id: user.id,
			userName: user.userName,
			firstName: user.firtName,
			email: user.email,
			avatar: user.avatar,
			userType: user.userType,
		},
		JWT_SECRET,
		{
			expiresIn: '7d',
		}
	);

	await sendResetPasswordEmail(email, token);

	res.status(200).json({
		message:
			'Se ha enviado un correo con instrucciones para restablecer tu contraseña',
	});
};
