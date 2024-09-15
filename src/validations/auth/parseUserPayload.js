import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el usuario

const userSchema = {
	email: Joi.string().email().max(255).required(),
	password: Joi.string().min(8).max(60).required(),
	resetPasswordToken: Joi.string().optional(),
	resetPasswordExpires: Joi.date().optional(),
};

export function parseUserPayload(payload) {
	const result = validate(userSchema, payload);
	return result.value;
}
