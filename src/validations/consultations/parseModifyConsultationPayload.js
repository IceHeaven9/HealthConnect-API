import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la modificación de una consulta

const modifyConsultationSchema = Joi.object({
	title: Joi.string().min(3).max(100).required().messages({
		'string.min': 'El título debe tener al menos 3 caracteres',
		'string.max': 'El título debe tener máximo 100 caracteres',
		'any.required': 'El título es requerido',
	}),
	description: Joi.string().min(10).max(1000).required().messages({
		'string.min': 'La descripción debe tener al menos 10 caracteres',
		'string.max': 'La descripción debe tener máximo 1000 caracteres',
		'any.required': 'La descripción es requerida',
	}),
	severity: Joi.string().valid('low', 'medium', 'high').required().messages({
		'string.valid':
			'La severidad debe ser uno de los siguientes valores: low, medium, high',
		'any.required': 'La severidad es requerida',
	}),
});

export const parseModifyConsultationPayload = (payload) => {
	const result = validate(modifyConsultationSchema, payload);
	return result.value;
};
