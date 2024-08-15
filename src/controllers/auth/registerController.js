import {
	assertEmailNotInUse,
	assertUsernameNotInUse,
	createUser,
} from "../../database/users.js";
import { sendValidationEmail } from "../../emails/validationEmail.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { parseRegisterPayload } from "../../validations/auth.js";
import crypto from "node:crypto";

export const registerController = async (req, res) => {
	const {
		firstName,
		lastName,
		userType,
		biography,
		codigoMedico,
		experience,
		avatar,
		email,
		password,
		userName,
	} = parseRegisterPayload(req.body);
	await assertEmailNotInUse(email);
	await assertUsernameNotInUse(userName);

	const hashedPassword = await hashPassword(password);
	const validationCode = crypto.randomInt(100000, 999999);

	const id = await createUser({
		firstName,
		lastName,
		userType,
		biography,
		codigoMedico,
		experience,
		avatar,
		email,
		hashedPassword,
		userName,
		validationCode,
	});

	sendValidationEmail({ firstName, email, validationCode });

	res.status(201).json({
		id,
	});
};
