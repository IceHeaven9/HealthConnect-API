import Joi from "joi";
import { validate } from "./validate.js";

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export function parseLoginPayload(payload) {
	const result = validate(loginSchema, payload);
	return result.value;
}

const registerSchema = Joi.object({
	firstName: Joi.string().min(3).max(255).required(),
	lastName: Joi.string().min(3).max(255),
	userName: Joi.string().min(3).max(255).required(),
	biography: Joi.string().max(500),
	codigoMedico: Joi.number().min(10).max(10),
	userType: Joi.string().valid("paciente", "doctor").required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export function parseRegisterPayload(payload) {
	const result = validate(registerSchema, payload);
	return result.value;
}
