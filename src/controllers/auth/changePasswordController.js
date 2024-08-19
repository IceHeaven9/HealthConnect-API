import { findUserById, setNewPassword } from "../../database/users.js";
import { generateErrors } from "../../utils/generateErrors.js";
import bcrypt from "bcrypt";

export const changePasswordController = async (req, res) => {
	const oldPassword = req.body.oldPassword;
	const newPassword1 = req.body.newPassword1;
	const newPassword2 = req.body.newPassword2;
	const id = req.body.id;
	const user = await findUserById(id);

	if (newPassword1 !== newPassword2) {
		throw generateErrors(
			400,
			"PASSWORDS_DONT_MATCH",
			"Las nuevas contraseñas no coinciden"
		);
	}

	if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
		throw generateErrors(401, "INVALID_CREDENTIALS", "Contraseña incorrecta");
	}

	if (oldPassword == newPassword1 || oldPassword == newPassword2) {
		throw generateErrors(
			400,
			"SAME_PASSWORD",
			"La nueva contraseña no puede ser igual a la anterior"
		);
	}

	await setNewPassword(newPassword1, user.id);

	res.status(200).json({ message: "Contraseña cambiada correctamente" });
};
