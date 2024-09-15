import Joi from 'joi';
import { validate } from '../validate.js';

// Validacion para obtención de consultas sin asignar a un doctor

const unassignedConsultationsSchema = Joi.object({
	specialityIds: Joi.array().items(Joi.number()).required(),
});

export const parseUnassignedConsultationsPayload = (payload) => {
	const result = validate(unassignedConsultationsSchema, payload);
	return result.value;
};
