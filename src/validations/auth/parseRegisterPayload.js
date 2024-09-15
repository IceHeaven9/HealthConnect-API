import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el registro

const registerSchema = Joi.object({
	firstName: Joi.string().min(3).max(50).required(),
	lastName: Joi.string().min(3).max(100),
	email: Joi.string().email().max(255).required(),
	password: Joi.string().min(6).max(60).required(),
	userType: Joi.string().valid('patient', 'doctor').required(),
	userName: Joi.string().min(3).max(40).required(),
	biography: Joi.string().max(5000),
	codigoMedico: Joi.number().optional(),
	experience: Joi.number().min(0).max(60),
	specialityId: Joi.array().items(Joi.number()),
});

export function parseRegisterPayload(payload) {
	const result = validate(registerSchema, payload);
	return result.value;
}
