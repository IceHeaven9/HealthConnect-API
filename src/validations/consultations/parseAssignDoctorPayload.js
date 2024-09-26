import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la asignación de un doctor a una consulta

const assignDoctorSchema = Joi.object({
	consultationId: Joi.number().required().messages({
		'number.base': 'El ID de la consulta debe ser un número',
		'any.required': 'El ID de la consulta es requerido',
	}),
});

export const parseAssignDoctorPayload = (payload) => {
	const result = validate(assignDoctorSchema, payload);
	return result.value;
};
