import {
	assertEmailNotInUse,
	assertUsernameNotInUse,
	createUser,
} from "../../database/users.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { parseRegisterPayload } from "../../validations/auth.js";
import { succesLog } from "./../../utils/logger.js";

export const registerController = async (req, res) => {
	const {
		firstName,
		lastName,
		userType,
		biography,
		codigoMedico,
		email,
		password,
		userName,
	} = parseRegisterPayload(req.body);
	await assertEmailNotInUse(email);
	await assertUsernameNotInUse(userName);

	const hashedPassword = await hashPassword(password);

	const id = await createUser({
		firstName,
		lastName,
		userType,
		biography,
		codigoMedico,
		email,
		hashedPassword,
		userName,
	});

	res.status(201).json({
		id,
	});
};

succesLog("RegisterController: User created successfully.");
