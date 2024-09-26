import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el controlador de restablecimiento de contraseña

const resetPasswordSchema = Joi.object({
	password1: Joi.string().min(8).max(60).required().messages({
		'string.min': 'La contraseña debe tener al menos 8 caracteres',
		'string.max': 'La contraseña debe tener máximo 60 caracteres',
		'any.required': 'La contraseña es requerida',
	}),
	password2: Joi.any().valid(Joi.ref('password1')).required().messages({
		'any.only': 'Las contraseñas no coinciden',
		'any.required': 'Confirmación de contraseña es requerida',
	}),
	recoveryPasswordCode: Joi.number().required().messages({
		'number.base': 'El código de recuperación debe ser un número',
		'any.required': 'El código de recuperación es requerido',
	}),
});

export function parseResetPasswordPayload(payload) {
	const result = validate(resetPasswordSchema, payload);
	return result.value;
}
