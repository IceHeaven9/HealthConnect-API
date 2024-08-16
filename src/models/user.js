import Joi from "joi";
import bcrypt from "bcrypt";

const userSchema = {
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	resetPasswordToken: Joi.string().optional(),
	resetPasswordExpires: Joi.date().optional(),
};

// Método para hashear la contraseña antes de guardar
const hashPassword = async (user) => {
	if (user.password) {
		user.password = await bcrypt.hash(user.password, 10);
	}
};

// Método para comparar contraseñas proporcionadas con la contraseña hasheada almacenada en la base de datos
const comparePassword = (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};
