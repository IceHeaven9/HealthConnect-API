import { generateErrors } from '../utils/generateErrors.js';
import { hashPassword } from '../utils/hashPassword.js';
import { Db } from './structure/db.js';

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

// Funcion para obtener los datos de los usuarios por email

export async function findUserByEmail(email) {
	const [[user]] = await Db.query(`SELECT * FROM users WHERE email = :email`, {
		email: email,
	});
	return user;
}

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

// Funcion para obtener los datos de un usuario por id

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

// Funcion para obtener los datos de un medico por id

export const findDoctorById = async (id) => {
	const [[doctor]] = await Db.query(
		`SELECT 
            u.id, 
            CONCAT(u.firstName, ' ', u.lastName) AS fullName, 
            u.avatar, 
            u.biography, 
            u.experience,  -- Agregar experiencia aquí
            u.userType,
            GROUP_CONCAT(s.name SEPARATOR ', ') AS specialities,
            (SELECT AVG(r.rating) 
             FROM responses r 
             JOIN consultations c ON r.consultationId = c.id 
             WHERE c.doctorId = u.id) AS averageRating
        FROM 
            users u
        LEFT JOIN 
            user_specialities us ON u.id = us.userId
        LEFT JOIN 
            specialities s ON us.specialityId = s.id
        WHERE 
            u.id = ? AND u.userType = "doctor"
        GROUP BY 
            u.id`,
		[id]
	);

	if (!doctor) {
		throw generateErrors(404, 'NOT_FOUND', 'Doctor no encontrado');
	}

	return doctor;
};
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
// Funcion para quitar el codigo de validacion de un usuario

export async function removeValidationCodeFromUser(userId) {
	await Db.query('UPDATE users SET validationCode = NULL WHERE id = :userId', {
		userId,
	});
}

// Funcion para obtener los datos de los medicos

export async function getDoctors() {
	const [doctors] = await Db.query(`
        SELECT 
            u.id, 
            u.firstName, 
            u.lastName, 
            u.avatar,
            u.biography, 
            GROUP_CONCAT(s.name SEPARATOR ', ') AS specialities,
            (SELECT AVG(r.rating) 
             FROM responses r 
             JOIN consultations c ON r.consultationId = c.id 
             WHERE c.doctorId = u.id) AS averageRating
        FROM 
            users u
        JOIN 
            user_specialities us ON u.id = us.userId
        JOIN 
            specialities s ON us.specialityId = s.id
        WHERE 
            u.userType = 'doctor'
        GROUP BY 
            u.id
    `);
	return doctors;
}
// Funcion para obtener los datos de un medico por id

export async function getDoctorById(id) {
	const [[doctor]] = await Db.query(
		`SELECT 
            u.id, 
            u.firstName, 
            u.lastName, 
            u.avatar,
            u.biography, 
            GROUP_CONCAT(s.name SEPARATOR ', ') AS specialities,
            (SELECT AVG(r.rating) 
             FROM responses r 
             JOIN consultations c ON r.consultationId = c.id 
             WHERE c.doctorId = u.id) AS averageRating
        FROM 
            users u
        JOIN 
            user_specialities us ON u.id = us.userId
        JOIN 
            specialities s ON us.specialityId = s.id
        WHERE 
            u.id = :id AND u.userType = 'doctor'
        GROUP BY 
            u.id`,
		{ id }
	);
	return doctor;
}
// Funcion para obtener los datos de los medicos por especialidad

export async function getDoctorsBySpecialityId(specialityId) {
	const [doctors] = await Db.query(
		`SELECT 
            u.id, 
            u.firstName, 
            u.lastName, 
            u.avatar,
            u.biography, 
            GROUP_CONCAT(s.name SEPARATOR ', ') AS specialities,
            (SELECT AVG(r.rating) 
             FROM responses r 
             JOIN consultations c ON r.consultationId = c.id 
             WHERE c.doctorId = u.id) AS averageRating
        FROM 
            users u
        JOIN 
            user_specialities us ON u.id = us.userId
        JOIN 
            specialities s ON us.specialityId = s.id
        WHERE 
            s.id = :specialityId AND u.userType = 'doctor'
        GROUP BY 
            u.id`,
		{ specialityId }
	);
	return doctors;
}

// Funcion para setear una nueva contraseña a un usuario

export async function setNewPassword(password1, id) {
	const hashedPassword = await hashPassword(password1);
	await Db.query('UPDATE users SET password = :hashedPassword WHERE id = :id', {
		hashedPassword,
		id: id,
	});
}

// Funcion para subir un avatar a un usuario

export const uploadUserAvatar = async (userId, avatarPath) => {
	await Db.query('UPDATE users SET avatar = ? WHERE id = ?', [
		avatarPath,
		userId,
	]);
};

// Funcion para verificar que una especialidad este asignada a un usuario

export async function assignSpecialitiesToUser(userId, specialityIds) {
	const values = specialityIds.map((specialityId) => [userId, specialityId]);
	await Db.query(
		`INSERT INTO user_specialities (userId, specialityId) VALUES ?`,
		[values]
	);
}

// Funcion para actualizar la información completa de un usuario
export const updateUserById = async (
	id,
	firstName,
	lastName,
	userName,
	biography,
	experience
) => {
	await Db.query(
		`UPDATE users SET firstName =?, lastName =?, userName =?, biography =?, experience =? WHERE id =?`,
		[firstName, lastName, userName, biography, experience, id]
	);
};

// Funcion para actualizar el nombre de un usuario
export const updateFirstName = async (id, firstName) => {
	await Db.query(`UPDATE users SET firstName =? WHERE id =?`, [firstName, id]);
};

// Funcion para actualizar el apellido de un usuario
export const updateLastName = async (id, lastName) => {
	await Db.query(`UPDATE users SET lastName =? WHERE id =?`, [lastName, id]);
};

// Funcion para actualizar el username de un usuario
export const updateUserName = async (id, userName) => {
	await Db.query(`UPDATE users SET userName =? WHERE id =?`, [userName, id]);
};

// Funcion para actualizar la biografia de un usuario
export const updateBiography = async (id, biography) => {
	await Db.query(`UPDATE users SET biography =? WHERE id =?`, [biography, id]);
};

// Funcion para actualizar la experiencia de un usuario
export const updateExperience = async (id, experience) => {
	await Db.query(`UPDATE users SET experience =? WHERE id =?`, [
		experience,
		id,
	]);
};

// Funcion para insertar el validation code de un usuario en la base de datos

export const setRecoveryPasswordCode = async (userId, recoveryPasswordCode) => {
	const query = 'UPDATE users SET recoveryPasswordCode = ? WHERE id = ?';
	const [result] = await Db.query(query, [recoveryPasswordCode, userId]);
	return result;
};

// Funcion para borrar el validation code de un usuario en la base de datos

export const deleteRecoveryPasswordCode = async (userId) => {
	const query = 'UPDATE users SET recoveryPasswordCode = NULL WHERE id = ?';
	const [result] = await Db.query(query, [userId]);
	return result;
};

// Funcion para obtener los datos de un usuario por su recovery password code

export const getUserByRecoveryPasswordCode = async (recoveryPasswordCode) => {
	const query = 'SELECT * FROM users WHERE recoveryPasswordCode = ? LIMIT 1';
	const [result] = await Db.query(query, [recoveryPasswordCode]);
	return result;
};

// Funcion para setear el validation code en null de un usuario en la base de datos

export const setRecoveryPasswordCodeToNull = async (userId) => {
	const query = 'UPDATE users SET recoveryPasswordCode = NULL WHERE id = ?';
	const [result] = await Db.query(query, [userId]);
	return result;
};
