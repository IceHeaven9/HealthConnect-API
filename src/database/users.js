import { generateErrors } from "../utils/generateErrors.js";
import { Db } from "./structure/db.js";

export async function findUserByEmail(email) {
	const [[user]] = await Db.query("SELECT * FROM users WHERE email = :email", {
		email,
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
	avatar,
	email,
	userName,
	hashedPassword,
	validationCode,
}) {
	const [{ insertId }] = await Db.query(
		`INSERT INTO users(firstName, lastName, userType, biography, codigoMedico, experience, avatar, email, password, userName, validationCode)
    VALUES (:firstName, :lastName, :userType, :biography, :codigoMedico, :experience, :avatar, :email, :hashedPassword, :userName, :validationCode)`,
		{
			firstName,
			lastName,
			userType,
			biography,
			codigoMedico,
			experience,
			avatar,
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
		throw generateErrors(400, "EMAIL_IN_USE", "The email is already in use");
	}
}

export async function assertUsernameNotInUse(userName) {
	const [[result]] = await Db.query(
		"SELECT username FROM users WHERE userName = :userName",
		{
			userName,
		}
	);

	if (result) {
		throw generateErrors(
			400,
			"USERNAME_IN_USE",
			"The username is already in use"
		);
	}
}

export async function removeValidationCodeFromUser(userId) {
	await Db.query("UPDATE users SET validationCode = NULL WHERE id = :userId", {
		userId,
	});
}
// export async function assertUserExists(userId) {
// 	const user = await getUserInfo(userId);
// 	if (!user) {
// 		throw generateErrors(404, "USER_NOT_FOUND", "The user do not exists.");
// 	}
// }

// export async function getUserProfile(userId) {
// 	const [[user]] = await db.query(
// 		"SELECT name, username, last_name, address, phone_number, password FROM users WHERE id = :userId",
// 		{
// 			userId,
// 		}
// 	);

// 	return user;
// }
// export async function getUserInfo(userId) {
//   const [[user]] = await db.query(
//     'SELECT id, username, name FROM users WHERE id = :userId',
//     {
//       userId,
//     }
//   );

//   return user;
// }

// export async function updateUserProfile({
//   name,
//   username,
//   last_name,
//   password,
//   phone_number,
//   address,
//   avatar,
//   userId,
// }) {
//   await db.query(
//     'UPDATE users SET name = :name, last_name = :last_name, username = :username, password = :password, phone_number = :phone_number, address = :address WHERE id = :userId',
//     {
//       name,
//       last_name,
//       password,
//       username,
//       phone_number,
//       address,
//       avatar,
//       userId,
//     }
//   );
// }
