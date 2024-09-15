import { Db } from '../../structure/db.js';

// Funcion para crear un usuario doctor

export async function createUserDoctor({
	firstName,
	lastName,
	userType,
	biography,
	codigoMedico,
	experience,
	email,
	userName,
	hashedPassword,
	validationCode,
}) {
	const [{ insertId }] = await Db.query(
		`INSERT INTO users(firstName, lastName, userType, biography, codigoMedico, experience, email, password, userName, validationCode)
				VALUES (:firstName, :lastName, :userType, :biography, :codigoMedico, :experience, :email, :hashedPassword, :userName, :validationCode)`,
		{
			firstName,
			lastName,
			userType,
			biography,
			codigoMedico,
			experience,
			email,
			userName,
			hashedPassword,
			validationCode,
		}
	);

	return insertId;
}
