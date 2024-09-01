import crypto from 'node:crypto';
import { CODIGO_MEDICO } from '../../../constants.js';
import {
	assertEmailNotInUse,
	assertUsernameNotInUse,
	assignSpecialitiesToUser,
	createUserDoctor,
	createUserPatient,
} from '../../database/users.js';
import { sendValidationEmail } from '../../emails/validationEmail.js';
import { hashPassword } from '../../utils/hashPassword.js';
import { parseRegisterPayload } from '../../validations/auth.js';
import { findSpecialitiesByIds } from '../../database/specialities.js';
import { generateErrors } from '../../utils/generateErrors.js';

// Controlador para registrar un usuario

export const registerController = async (req, res) => {
	const {
		firstName,
		lastName,
		userType,
		biography,
		codigoMedico,
		specialityId,
		experience,
		email,
		password,
		userName,
	} = parseRegisterPayload(req.body);

	if (userType === 'doctor' && !codigoMedico) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'El código médico es obligatorio para los doctores'
		);
	}

	await assertEmailNotInUse(email);
	await assertUsernameNotInUse(userName);

	const hashedPassword = await hashPassword(password);
	const validationCode = crypto.randomInt(100000, 999999);

	if (userType === 'doctor') {
		if (codigoMedico != CODIGO_MEDICO) {
			throw generateErrors(
				400,
				'BAD_REQUEST',
				'El código médico no es correcto'
			);
		}

		const specialities = await findSpecialitiesByIds(specialityId);
		if (specialities.length !== specialityId.length) {
			throw generateErrors(
				400,
				'BAD_REQUEST',
				'Una o más especialidades no son válidas'
			);
		}
		const id = await createUserDoctor({
			firstName,
			lastName,
			userType,
			biography,
			codigoMedico,
			experience,
			email,
			hashedPassword,
			userName,
			validationCode,
		});

		await assignSpecialitiesToUser(id, specialityId);

		sendValidationEmail({ firstName, email, validationCode });
		res.status(201).json({ id });
	}

	if (userType === 'patient') {
		const id = await createUserPatient({
			firstName,
			lastName,
			userType,
			email,
			hashedPassword,
			userName,
			validationCode,
		});
		sendValidationEmail({ firstName, email, validationCode });
		res.status(201).json({
			id,
		});
	}
};
