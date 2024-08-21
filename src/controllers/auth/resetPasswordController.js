import jwt from "jsonwebtoken";
import { findUserById, setNewPassword } from "../../database/users.js";
import { JWT_SECRET } from "../../../constants.js";
import { parseResetPasswordPayload } from "../../validations/auth.js";

export const resetPasswordController = async (req, res) => {
  const { password1, password2 } = parseResetPasswordPayload(req.body);
  const { token } = req.params;

  const decode = jwt.verify(token, JWT_SECRET);

  // Busca al usuario por el token
  const user = await findUserById(decode.id);
  const id = user.id;
  if (!user) {
    return res.status(400).json({ message: "Token inválido o expirado" });
  }

  // Establece la nueva contraseña
  await setNewPassword(password1, id);

  res.status(200).json({ message: "Contraseña restablecida exitosamente" });
};
