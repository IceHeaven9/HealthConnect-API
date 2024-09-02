import Joi from 'joi';
import { validate } from './validate.js';

// Validaciones para la creación de una consulta

const consultationSchema = Joi.object({
	title: Joi.string().min(3).max(100).required(),
	date: Joi.date().required(),
	description: Joi.string().min(10).max(1000).required(),
	specialityid: Joi.number().required(),
	doctorid: Joi.number(),
	severity: Joi.string().required(),
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
	title: Joi.string().min(3).max(100),
	description: Joi.string().min(10).max(1000),
	severity: Joi.string().min(3).max(50),
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
