import {
	findUserByEmail,
	removeValidationCodeFromUser,
} from '../../database/users.js';
import { generateErrors } from '../../utils/generateErrors.js';

export const validateEmailController = async (req, res) => {
	const { email, code } = req.body;

	const user = await findUserByEmail(email);

	if (!user) {
		throw generateErrors(400, 'INVALID_CODE', 'The code is invalid');
	}

	if (!user.validationCode) {
		throw generateErrors(
			400,
			'EMAIL_ALREDY_VALIDATED',
			'Email is already validated'
		);
	}

	if (user.validationCode !== code) {
		throw generateErrors(400, 'INVALID_CODE', 'The code is invalid');
	}

	await removeValidationCodeFromUser(user.id);

	res.status(200).send({ message: 'Email validated successfully' });
};
