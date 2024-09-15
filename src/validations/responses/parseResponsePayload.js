import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la creación de una respuesta

const responseSchema = Joi.object({
	content: Joi.string().max(5000).required(),
});

export const parseResponsePayload = (payload) => {
	const result = validate(responseSchema, payload);
	return result.value;
};
