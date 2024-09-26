import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la creación de una respuesta

const responseSchema = Joi.object({
	content: Joi.string().max(5000).required().messages({
		'string.max': 'El contenido debe tener máximo 5000 caracteres',
		'any.required': 'El contenido es requerido',
	}),
});

export const parseResponsePayload = (payload) => {
	const result = validate(responseSchema, payload);
	return result.value;
};
