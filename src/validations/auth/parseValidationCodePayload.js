import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el controlador de verificación de código de validación

const validationCodeSchema = Joi.object({
	code: Joi.number().required(),
});

export function parseValidationCodePayload(payload) {
	const result = validate(validationCodeSchema, payload);
	return result.value;
}
