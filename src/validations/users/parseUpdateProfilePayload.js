import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la modificacion del perfil de usuario

const updateProfileSchema = Joi.object({
	firstName: Joi.string().min(3).max(50).messages({
		'string.min': 'El nombre debe tener al menos 3 caracteres',
		'string.max': 'El nombre debe tener máximo 50 caracteres',
	}),
	lastName: Joi.string().min(3).max(100).messages({
		'string.min': 'El apellido debe tener al menos 3 caracteres',
		'string.max': 'El apellido debe tener máximo 100 caracteres',
	}),
	userName: Joi.string().min(3).max(40).messages({
		'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
		'string.max': 'El nombre de usuario debe tener máximo 40 caracteres',
	}),
	biography: Joi.string().min(3).max(5000).messages({
		'string.min': 'La biografía debe tener al menos 3 caracteres',
		'string.max': 'La biografía debe tener máximo 5000 caracteres',
	}),
	experience: Joi.number().min(0).max(60).messages({
		'number.min': 'La experiencia debe ser al menos 0 años',
		'number.max': 'La experiencia debe ser máximo 60 años',
	}),
});

export const parseUpdateProfilePayload = (payload) => {
	const result = validate(updateProfileSchema, payload);
	return result.value;
};
