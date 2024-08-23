import { generateErrors } from '../utils/generateErrors.js';
import { hashPassword } from '../utils/hashPassword.js';
import { Db } from './structure/db.js';

export async function findUserByEmail(email) {
	const [[user]] = await Db.query(`SELECT * FROM users WHERE email = :email`, {
		email: email,
	});
	return user;
}

export async function createUser({
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

export async function assertEmailNotInUse(email) {
	const user = await findUserByEmail(email);

	if (user) {
		throw generateErrors(400, 'EMAIL_IN_USE', 'The email is already in use');
	}
}

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
			'The username is already in use'
		);
	}
}

export async function removeValidationCodeFromUser(userId) {
	await Db.query('UPDATE users SET validationCode = NULL WHERE id = :userId', {
		userId,
	});
}

// Funcion para obtener los datos de los medicos
export async function getDoctors() {
	const [doctors] = await Db.query(`
				SELECT 
								u.firstName, 
								u.lastName, 
								u.biography, 
								s.name AS speciality 
				FROM 
								users u
				JOIN 
								specialities s ON u.specialityId = s.id
				WHERE 
								u.userType = 'doctor'
`);
	return doctors;
}

export async function findUserById(id) {
	const [[user]] = await Db.query('SELECT * FROM users WHERE id = :id', {
		id,
	});

	const [specialities] = await Db.query(
		`SELECT s.id 
         FROM user_specialities us
         JOIN specialities s ON us.specialityId = s.id
         WHERE us.userId = :id`,
		{
			id,
		}
	);
	user.specialities = specialities.map((row) => row.id);

	return user;
}
export async function setNewPassword(password1, id) {
	const hashedPassword = await hashPassword(password1);
	await Db.query('UPDATE users SET password = :hashedPassword WHERE id = :id', {
		hashedPassword,
		id: id,
	});
}

export const uploadUserAvatar = async (userId, avatarPath) => {
	await Db.query('UPDATE users SET avatar = ? WHERE id = ?', [
		avatarPath,
		userId,
	]);
};

export async function assignSpecialitiesToUser(userId, specialityIds) {
	const values = specialityIds.map((specialityId) => [userId, specialityId]);
	await Db.query(
		`INSERT INTO user_specialities (userId, specialityId) VALUES ?`,
		[values]
	);
}
