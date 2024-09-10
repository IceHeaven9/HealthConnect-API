import Joi from 'joi';
import { validate } from './validate.js';

// Validaciones para la creación de una respuesta

const responseSchema = Joi.object({
	content: Joi.string().max(5000).required(),
});

export const parseResponsePayload = (payload) => {
	const result = validate(responseSchema, payload);
	return result.value;
};

// Validaciones para insertar el rating de una respuesta

const ratingSchema = Joi.object({
	rating: Joi.number().valid(0, 1, 2, 3, 4, 5).required(),
});

export const parseRatingPayload = (payload) => {
	const result = validate(ratingSchema, payload);
	return result.value;
};

// Validaciones para la edición de una respuesta

const editResponseSchema = Joi.object({
	content: Joi.string().max(5000).required(),
});

export const parseEditResponsePayload = (payload) => {
	const result = validate(editResponseSchema, payload);
	return result.value;
};
