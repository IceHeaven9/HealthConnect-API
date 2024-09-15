import { removeValidationCodeFromUser } from '../../database/services/users/removeValidationCodeFromUser.js';
import { findUserByValidationCode } from '../../database/services/users/findUserByValidationCode.js';
import { generateErrors } from '../../utils/generateErrors.js';
import { parseValidationCodePayload } from '../../validations/auth.js';

// Controlador para validar el email

export const validateEmailController = async (req, res) => {
	const { code } = parseValidationCodePayload(req.body);

	const user = await findUserByValidationCode(code);

	if (!user) {
		throw generateErrors(400, 'INVALID_CODE', 'El código es inválido');
	}

	if (!user.validationCode) {
		throw generateErrors(
			400,
			'EMAIL_ALREADY_VALIDATED',
			'El correo electrónico ya está validado'
		);
	}

	if (user.validationCode !== code) {
		throw generateErrors(400, 'INVALID_CODE', 'El código es inválido');
	}

	await removeValidationCodeFromUser(user.id);

	res.status(200).send({ message: 'Correo electrónico validado con éxito' });
};
