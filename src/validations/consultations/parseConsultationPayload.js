import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la creación de una consulta

const consultationSchema = Joi.object({
	title: Joi.string().min(3).max(100).required(),
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
		}),
	description: Joi.string().min(10).max(1000).required(),
	specialityid: Joi.number().required(),
	doctorId: Joi.number(),
	severity: Joi.string().valid('low', 'medium', 'high').required(),
});

export const parseConsultationPayload = (payload) => {
	const result = validate(consultationSchema, payload);
	return result.value;
};
