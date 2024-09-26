import Joi from 'joi';
import { validate } from '../validate.js';

// Validacion para obtención de consultas sin asignar a un doctor

const unassignedConsultationsSchema = Joi.object({
	specialityIds: Joi.array()
		.items(
			Joi.number().messages({
				'number.base': 'El ID de la especialidad debe ser un número',
			})
		)
		.required()
		.messages({
			'array.base':
				'Los IDs de las especialidades deben ser un arreglo de números',
			'any.required': 'Los IDs de las especialidades son requeridos',
		}),
});

export const parseUnassignedConsultationsPayload = (payload) => {
	const result = validate(unassignedConsultationsSchema, payload);
	return result.value;
};
