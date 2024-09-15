import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la modificación de una consulta

const modifyConsultationSchema = Joi.object({
	title: Joi.string().min(3).max(100).required(),
	description: Joi.string().min(10).max(1000).required(),
	severity: Joi.string().valid('low', 'medium', 'high').required(),
});

export const parseModifyConsultationPayload = (payload) => {
	const result = validate(modifyConsultationSchema, payload);
	return result.value;
};
