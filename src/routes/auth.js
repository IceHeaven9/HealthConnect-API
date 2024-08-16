import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginController } from "../controllers/auth/loginController.js";
import { registerController } from "../controllers/auth/registerController.js";
import { validateEmailController } from "../controllers/auth/validateEmailController.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { transport } from "../emails/email.js";
import { parseUserPayload } from "../validations/auth.js";

export const authRoutes = Router();

authRoutes.post("/login", asyncHandler(loginController));
authRoutes.post("/register", asyncHandler(registerController));
authRoutes.post("/validate-email", asyncHandler(validateEmailController));

// --> Endpoint para solicitar recuperación de contraseña
authRoutes.post(
  "/recover-password",
  asyncHandler(async (req, res) => {
    const { email } = parseUserPayload(req.body);

    // Busca el usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Genera un token único
    const token = crypto.randomBytes(20).toString("hex");
    // Guarda el token y la fecha de expiración en el usuario
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    // Envía el correo electrónico
    const mailOptions = () => {
      transport.sendMail({
        to: email,
        from: process.env.EMAIL_USER, // Cambia esto a tu email
        subject: "Recuperación de contraseña",
        text: `Has solicitado la recuperación de tu contraseña. Haz clic en el siguiente enlace para restablecerla: http://tu_dominio/reset/${token}`,
      });
    };
  })
);

// Endpoint para restablecer la contraseña
authRoutes.post(
  "/reset/:token",
  asyncHandler(async (req, res) => {
    const { password } = req.body;
    const token = req.params.autorization;

    try {
      // Busca al usuario por el token
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Verifica que el token no haya expirado
      });
      if (!user) {
        return res.status(400).json({ message: "Token inválido o expirado" });
      }

      // Establece la nueva contraseña
      user.password = await bcrypt.hash(password, 10); // hashea la contraseña antes de guardarla
      user.resetPasswordToken = undefined; // Limpia el token
      user.resetPasswordExpires = undefined; // Limpia la fecha de expiración
      await user.save();

      res.status(200).json({ message: "Contraseña restablecida exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al restablecer la contraseña" });
    }
  })
);
