import {
	assertEmailNotInUse,
	assertUsernameNotInUse,
	createUser,
} from "../../database/users.js";
import { sendValidationEmail } from "../../emails/validationEmail.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { infoLog } from "../../utils/logger.js";
import { parseRegisterPayload } from "../../validations/auth.js";
import crypto from "node:crypto";

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
	const validationCode = crypto.randomInt(100000, 999999);

	const id = await createUser({
		firstName,
		lastName,
		userType,
		biography,
		codigoMedico,
		email,
		hashedPassword,
		userName,
		validationCode,
	});

	sendValidationEmail({ firstName, email, validationCode });

	infoLog(`User registered: ${email}`);

	res.status(201).json({
		id,
	});
};
