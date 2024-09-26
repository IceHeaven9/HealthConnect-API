import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para insertar el rating de una respuesta

const ratingSchema = Joi.object({
	rating: Joi.number().valid(0, 1, 2, 3, 4, 5).required().messages({
		'number.base': 'El rating debe ser un número',
		'number.valid':
			'El rating debe ser uno de los siguientes valores: 0, 1, 2, 3, 4, 5',
		'any.required': 'El rating es requerido',
	}),
});

export const parseRatingPayload = (payload) => {
	const result = validate(ratingSchema, payload);
	return result.value;
};
