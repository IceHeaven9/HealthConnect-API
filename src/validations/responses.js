import Joi from 'joi';
import { validate } from './validate.js';

// Validaciones para la creación de una respuesta

const responseSchema = Joi.object({
	content: Joi.string().required(),
	rating: Joi.number(),
});

export const parseResponsePayload = (payload) => {
	const result = validate(responseSchema, payload);
	return result.value;
};

// Validaciones para insertar el rating de una respuesta

const ratingSchema = Joi.object({
	rating: Joi.number().required(),
});

export const parseRatingPayload = (payload) => {
	const result = validate(ratingSchema, payload);
	return result.value;
};
