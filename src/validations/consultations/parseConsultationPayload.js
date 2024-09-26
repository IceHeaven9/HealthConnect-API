import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la creación de una consulta

const consultationSchema = Joi.object({
	title: Joi.string().min(3).max(100).required().messages({
		'string.min': 'El título debe tener al menos 3 caracteres',
		'string.max': 'El título debe tener máximo 100 caracteres',
		'any.required': 'El título es requerido',
	}),
	date: Joi.date()
		.required()
		.custom((value, helpers) => {
			const now = new Date();
			const tomorrow = new Date(now);
			tomorrow.setDate(now.getUTCDate() + 1);

			if (value < tomorrow) {
				return helpers.message(
					'La fecha debe ser al menos un día después de la fecha actual'
				);
			}
			return value;
		})
		.messages({
			'date.base': 'La fecha debe ser una fecha válida',
			'any.required': 'La fecha es requerida',
		}),
	description: Joi.string().min(10).max(1000).required().messages({
		'string.min': 'La descripción debe tener al menos 10 caracteres',
		'string.max': 'La descripción debe tener máximo 1000 caracteres',
		'any.required': 'La descripción es requerida',
	}),
	specialityid: Joi.number().required().messages({
		'number.base': 'El ID de la especialidad debe ser un número',
		'any.required': 'El ID de la especialidad es requerido',
	}),
	doctorId: Joi.number().messages({
		'number.base': 'El ID del doctor debe ser un número',
	}),
	severity: Joi.string().valid('low', 'medium', 'high').required().messages({
		'string.valid':
			'La severidad debe ser uno de los siguientes valores: low, medium, high',
		'any.required': 'La severidad es requerida',
	}),
});

export const parseConsultationPayload = (payload) => {
	const result = validate(consultationSchema, payload);
	return result.value;
};
