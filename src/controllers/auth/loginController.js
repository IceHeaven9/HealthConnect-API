import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../constants.js";
import { findUserByEmail } from "../../database/users.js";
import { generateErrors } from "../../utils/generateErrors.js";
import { parseLoginPayload } from "../../validations/auth.js";

export const loginController = async (req, res) => {
	const { email, password } = parseLoginPayload(req.body);
	const user = await findUserByEmail(email);

	if (!user || !bcrypt.compare(password, user.password)) {
		throw generateErrors(
			401,
			"INVALID_CREDENTIALS",
			"Invalid mail or password"
		);
	}

	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			userType: user.userType,
		},
		JWT_SECRET,
		{
			expiresIn: "7d",
		}
	);

	res.status(200).json({
		token,
	});
};
