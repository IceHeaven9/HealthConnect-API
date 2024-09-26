import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el registro

const registerSchema = Joi.object({
	firstName: Joi.string().min(3).max(50).required().messages({
		'string.min': 'El nombre debe tener al menos 3 caracteres',
		'string.max': 'El nombre debe tener máximo 50 caracteres',
		'any.required': 'El nombre es requerido',
	}),
	lastName: Joi.string().min(3).max(100).messages({
		'string.min': 'El apellido debe tener al menos 3 caracteres',
		'string.max': 'El apellido debe tener máximo 100 caracteres',
	}),
	email: Joi.string().email().max(255).required().messages({
		'string.email': 'Correo electrónico no válido',
		'string.max':
			'Correo electrónico demasiado largo, debe tener máximo 255 caracteres',
		'any.required': 'Correo electrónico es requerido',
	}),
	password: Joi.string().min(6).max(60).required().messages({
		'string.min':
			'Contraseña demasiado corta, debe tener al menos 6 caracteres',
		'string.max': 'Contraseña demasiado larga, debe tener máximo 60 caracteres',
		'any.required': 'Contraseña es requerida',
	}),
	userType: Joi.string().valid('patient', 'doctor').required().messages({
		'any.only': 'Tipo de usuario no válido',
		'any.required': 'Tipo de usuario es requerido',
	}),
	userName: Joi.string().min(3).max(40).required().messages({
		'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
		'string.max': 'El nombre de usuario debe tener máximo 40 caracteres',
		'any.required': 'El nombre de usuario es requerido',
	}),
	biography: Joi.string().max(5000).messages({
		'string.max': 'La biografía debe tener máximo 5000 caracteres',
	}),
	codigoMedico: Joi.number().optional().messages({
		'number.base': 'El código médico debe ser un número',
	}),
	experience: Joi.number().min(0).max(60).messages({
		'number.min': 'La experiencia debe ser al menos 0 años',
		'number.max': 'La experiencia debe ser máximo 60 años',
	}),
	specialityId: Joi.array().items(Joi.number()).messages({
		'array.base': 'Las especialidades deben ser un arreglo de números',
	}),
});

export function parseRegisterPayload(payload) {
	const result = validate(registerSchema, payload);
	return result.value;
}
