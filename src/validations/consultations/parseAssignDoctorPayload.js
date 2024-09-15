import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la asignación de un doctor a una consulta

const assignDoctorSchema = Joi.object({
	consultationId: Joi.number().required(),
});

export const parseAssignDoctorPayload = (payload) => {
	const result = validate(assignDoctorSchema, payload);
	return result.value;
};
