import { Db } from '../../structure/db.js';
import { generateErrors } from '../../../utils/generateErrors.js';

// Funcion para verificar que el username no este en uso

export async function assertUsernameNotInUse(userName) {
	const [[result]] = await Db.query(
		'SELECT username FROM users WHERE userName = :userName',
		{
			userName,
		}
	);

	if (result) {
		throw generateErrors(
			400,
			'USERNAME_IN_USE',
			'El nombre de usuario ya está en uso'
		);
	}
}
