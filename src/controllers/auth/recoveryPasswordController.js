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
   

    // Envía el correo electrónico
    const mailOptions = () => {
      transport.sendMail({
        to: email,
        from: process.env.EMAIL_USER, // Cambia esto a tu email
        subject: "Recuperación de contraseña",
        text: `Has solicitado la recuperación de tu contraseña. Haz clic en el siguiente enlace para restablecerla: http://tu_dominio/reset/${token}`,
      });
    };
  }