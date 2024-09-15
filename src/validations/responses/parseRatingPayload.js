import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para insertar el rating de una respuesta

const ratingSchema = Joi.object({
	rating: Joi.number().valid(0, 1, 2, 3, 4, 5).required(),
});

export const parseRatingPayload = (payload) => {
	const result = validate(ratingSchema, payload);
	return result.value;
};
