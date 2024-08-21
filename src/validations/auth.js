import Joi from "joi";
import { validate } from "./validate.js";

// Validaciones para el login
const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export function parseLoginPayload(payload) {
	const result = validate(loginSchema, payload);
	return result.value;
}

// Validaciones para el registro
const registerSchema = Joi.object({
	firstName: Joi.string().min(3).max(255).required(),
	lastName: Joi.string().min(3).max(255),
	userName: Joi.string().min(3).max(255).required(),
	biography: Joi.string().max(500),
	validationCode: Joi.number().min(100000).max(999999),
	codigoMedico: Joi.number(),
	experience: Joi.number().min(1),
	userType: Joi.string().valid("paciente", "doctor").required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export function parseRegisterPayload(payload) {
	const result = validate(registerSchema, payload);
	return result.value;
}

const userSchema = {
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	resetPasswordToken: Joi.string().optional(),
	resetPasswordExpires: Joi.date().optional(),
};

export function parseUserPayload(payload) {
	const result = validate(userSchema, payload);
	return result.value;
}

// Validaciones para el cambio de contraseña

const schema = Joi.object({
	oldPassword: Joi.string().required(),
	newPassword1: Joi.string().min(8).required(),
	newPassword2: Joi.any()
		.valid(Joi.ref("newPassword1"))
		.required()
		.messages({ "any.only": "Passwords do not match" }),
});
export function parseChangePasswordPayload(payload) {
	const result = validate(schema, payload);
	return result.value;
}
