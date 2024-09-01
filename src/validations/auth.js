import Joi from 'joi';
import { validate } from './validate.js';

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
	codigoMedico: Joi.number().optional(),
	experience: Joi.number().min(1),
	userType: Joi.string().valid('patient', 'doctor').required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	specialityId: Joi.array().items(Joi.number()),
});

export function parseRegisterPayload(payload) {
	const result = validate(registerSchema, payload);
	return result.value;
}

// Validaciones para el usuario

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
		.valid(Joi.ref('newPassword1'))
		.required()
		.messages({ 'any.only': 'Passwords do not match' }),
});
export function parseChangePasswordPayload(payload) {
	const result = validate(schema, payload);
	return result.value;
}

// Validaciones para el controlador de recuperación de contraseña

const recoveryPasswordSchema = Joi.object({
	email: Joi.string().email().required(),
});

export function parseRecoveryPasswordPayload(payload) {
	const result = validate(recoveryPasswordSchema, payload);
	return result.value;
}

// Validaciones para el controlador de restablecimiento de contraseña

const resetPasswordSchema = Joi.object({
	password1: Joi.string().min(8).required(),
	password2: Joi.any()
		.valid(Joi.ref('password1'))
		.required()
		.messages({ 'any.only': 'Passwords do not match' }),
});

export function parseResetPasswordPayload(payload) {
	const result = validate(resetPasswordSchema, payload);
	return result.value;
}

// Validaciones para el controlador de verificación de código de validación

const validationCodeSchema = Joi.object({
	email: Joi.string().email().required(),
	code: Joi.number().required(),
});

export function parseValidationCodePayload(payload) {
	const result = validate(validationCodeSchema, payload);
	return result.value;
}
