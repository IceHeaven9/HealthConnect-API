import { generateErrors } from '../../../utils/generateErrors.js';
import { findUserByEmail } from './findUserByEmail.js';

// Funcion para verificar que el email no este en uso

export async function assertEmailNotInUse(email) {
	const user = await findUserByEmail(email);

	if (user) {
		throw generateErrors(
			400,
			'EMAIL_IN_USE',
			'El correo electrónico ya está en uso'
		);
	}
}
