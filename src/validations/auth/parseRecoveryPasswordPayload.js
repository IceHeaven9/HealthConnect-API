import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el controlador de recuperación de contraseña

const recoveryPasswordSchema = Joi.object({
	email: Joi.string().email().max(255).required().messages({
		'string.email': 'Correo electrónico no válido',
		'string.max':
			'Correo electrónico demasiado largo, debe tener máximo 255 caracteres',
		'any.required': 'Correo electrónico es requerido',
	}),
});

export function parseRecoveryPasswordPayload(payload) {
	const result = validate(recoveryPasswordSchema, payload);
	return result.value;
}
