import Joi from 'joi';
import { validate } from './validate.js';

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

// Validacion para obtención de consultas sin asignar a un doctor

const unassignedConsultationsSchema = Joi.object({
	specialityIds: Joi.array().items(Joi.number()).required(),
});

export const parseUnassignedConsultationsPayload = (payload) => {
	const result = validate(unassignedConsultationsSchema, payload);
	return result.value;
};
// Validaciones para la asignación de un doctor a una consulta

const assignDoctorSchema = Joi.object({
	consultationId: Joi.number().required(),
});

export const parseAssignDoctorPayload = (payload) => {
	const result = validate(assignDoctorSchema, payload);
	return result.value;
};

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

export const allowedMimeTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'text/plain',
];
