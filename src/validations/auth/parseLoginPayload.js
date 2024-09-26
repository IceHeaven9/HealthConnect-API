import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el login

const loginSchema = Joi.object({
	email: Joi.string().email().max(100).required(),
	password: Joi.string().min(8).max(60).required().messages({
		'string.min':
			'Contraseña demasiado corta, debe tener al menos 8 caracteres',
	}),
});

export function parseLoginPayload(payload) {
	const result = validate(loginSchema, payload);
	return result.value;
}
