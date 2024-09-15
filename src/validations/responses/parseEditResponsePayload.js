import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la edición de una respuesta

const editResponseSchema = Joi.object({
	content: Joi.string().max(5000).required(),
});

export const parseEditResponsePayload = (payload) => {
	const result = validate(editResponseSchema, payload);
	return result.value;
};
