import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el controlador de restablecimiento de contraseña

const resetPasswordSchema = Joi.object({
	password1: Joi.string().min(8).max(60).required(),
	password2: Joi.any()
		.valid(Joi.ref('password1'))
		.required()
		.messages({ 'any.only': 'Passwords do not match' }),
	recoveryPasswordCode: Joi.number().required(),
});

export function parseResetPasswordPayload(payload) {
	const result = validate(resetPasswordSchema, payload);
	return result.value;
}
