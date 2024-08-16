export const resetPasswordController = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    const decode = jwt.verify(token, JWT_SECRET);

    // Busca al usuario por el token
    const user = await findUserById(decode.id);
    if (!user) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    // Establece la nueva contraseña
    await setNewPassword(password);
    user.resetPasswordToken = undefined; // Limpia el token
    user.resetPasswordExpires = undefined; // Limpia la fecha de expiración
    await user.save();

    res.status(200).json({ message: "Contraseña restablecida exitosamente" });
  };