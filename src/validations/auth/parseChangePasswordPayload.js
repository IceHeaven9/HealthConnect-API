import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el cambio de contraseña

const schema = Joi.object({
	oldPassword: Joi.string().min(8).max(60).required().messages({
		'string.min':
			'Contraseña antigua demasiado corta, debe tener al menos 8 caracteres',
		'string.max':
			'Contraseña antigua demasiado larga, debe tener máximo 60 caracteres',
		'any.required': 'Contraseña antigua es requerida',
	}),
	newPassword1: Joi.string().min(8).max(60).required().messages({
		'string.min':
			'Nueva contraseña demasiado corta, debe tener al menos 8 caracteres',
		'string.max':
			'Nueva contraseña demasiado larga, debe tener máximo 60 caracteres',
		'any.required': 'Nueva contraseña es requerida',
	}),
	newPassword2: Joi.any().valid(Joi.ref('newPassword1')).required().messages({
		'any.only': 'Las contraseñas no coinciden',
		'any.required': 'Confirmación de nueva contraseña es requerida',
	}),
});
export function parseChangePasswordPayload(payload) {
	const result = validate(schema, payload);
	return result.value;
}
