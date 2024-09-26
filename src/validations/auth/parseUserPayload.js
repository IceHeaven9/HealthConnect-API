import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el usuario

const userSchema = {
	email: Joi.string().email().max(255).required().messages({
		'string.email': 'Correo electrónico no válido',
		'string.max':
			'Correo electrónico demasiado largo, debe tener máximo 255 caracteres',
		'any.required': 'Correo electrónico es requerido',
	}),
	password: Joi.string().min(8).max(60).required().messages({
		'string.min': 'La contraseña debe tener al menos 8 caracteres',
		'string.max': 'La contraseña debe tener máximo 60 caracteres',
		'any.required': 'La contraseña es requerida',
	}),
	resetPasswordToken: Joi.string().optional().messages({
		'string.base': 'El token de restablecimiento debe ser una cadena de texto',
	}),
	resetPasswordExpires: Joi.date().optional().messages({
		'date.base': 'La fecha de expiración debe ser una fecha válida',
	}),
};

export function parseUserPayload(payload) {
	const result = validate(userSchema, payload);
	return result.value;
}
