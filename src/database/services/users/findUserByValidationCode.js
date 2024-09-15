import { Db } from './structure/db.js';

// Funcion para obtener los datos de los usuarios por validation code
export async function findUserByValidationCode(validationCode) {
	const [[user]] = await Db.query(
		`SELECT * FROM users WHERE validationCode = :validationCode`,
		{
			validationCode: validationCode,
		}
	);

	return user;
}
