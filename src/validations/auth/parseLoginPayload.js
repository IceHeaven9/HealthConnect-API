import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el login

const loginSchema = Joi.object({
	email: Joi.string().email().max(100).required().messages({
		'string.email': 'Correo electrónico no válido',
		'string.max':
			'Correo electrónico demasiado largo, debe tener máximo 100 caracteres',
		'any.required': 'Correo electrónico es requerido',
	}),
	password: Joi.string().min(8).max(60).required().messages({
		'string.min':
			'Contraseña demasiado corta, debe tener al menos 8 caracteres',
		'string.max': 'Contraseña demasiado larga, debe tener máximo 60 caracteres',
		'any.required': 'Contraseña es requerida',
	}),
});
export function parseLoginPayload(payload) {
	const result = validate(loginSchema, payload);
	return result.value;
}
