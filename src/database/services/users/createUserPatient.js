import { Db } from './structure/db.js';

// Funcion para crear un usuario paciente

export async function createUserPatient({
	firstName,
	lastName,
	userType,
	email,
	userName,
	hashedPassword,
	validationCode,
}) {
	const [{ insertId }] = await Db.query(
		`INSERT INTO users(firstName, lastName, userType, email, password, userName, validationCode)
				VALUES (:firstName, :lastName, :userType,:email, :hashedPassword, :userName, :validationCode)`,
		{
			firstName,
			lastName,
			userType,
			email,
			userName,
			hashedPassword,
			validationCode,
		}
	);

	return insertId;
}
