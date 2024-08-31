import Joi from 'joi';
import { validate } from './validate.js';

// Validaciones para la creación de una consulta

const consultationSchema = Joi.object({
	title: Joi.string().required(),
	date: Joi.date().required(),
	description: Joi.string().required(),
	specialityid: Joi.number().required(),
	doctorid: Joi.number(),
	severity: Joi.string().required(),
	date: Joi.date(),
});

export const parseConsultationPayload = (payload) => {
	const result = validate(consultationSchema, payload);
	return result.value;
};

// Validaciones para la asignación de un doctor a una consulta

const assignDoctorSchema = Joi.object({
	doctorId: Joi.number().required(),
	consultationId: Joi.number().required(),
});

export const parseAssignDoctorPayload = (payload) => {
	const result = validate(assignDoctorSchema, payload);
	return result.value;
};

// Validaciones para la modificación de una consulta

const modifyConsultationSchema = Joi.object({
	title: Joi.string(),
	description: Joi.string(),
	severity: Joi.string(),
});

export const parseModifyConsultationPayload = (payload) => {
	const result = validate(modifyConsultationSchema, payload);
	return result.value;
};
