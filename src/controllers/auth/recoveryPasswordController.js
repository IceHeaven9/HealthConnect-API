import { sendResetPasswordEmail } from "../../emails/recoveryPasswordEmail";

export const recoveryPasswordController = async (req, res) => {
	const { email } = parseUserPayload(req.body);

	// Busca el usuario por correo electrónico
	const user = await findUserByEmail({ email });
	if (!user) {
		return res.status(404).json({ message: "Usuario no encontrado" });
	}

	// Genera un token único
	const token = jwt.sign(
		{
			id: user.id,
			userName: user.userName,
			firstName: user.firtName,
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

	await sendResetPasswordEmail(email, token);

	// Envía el correo electrónico
};
