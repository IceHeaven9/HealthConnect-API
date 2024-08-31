import Joi from 'joi';
import { validate } from './validate.js';

// Validaciones para la modificacion del perfil de usuario

const updateProfileSchema = Joi.object({
	firstName: Joi.string().min(3).max(30),
	lastName: Joi.string().min(3).max(30),
	userName: Joi.string().min(3).max(30),
	biography: Joi.string().min(3).max(255),
	experience: Joi.string().min(3).max(255),
});

export const parseUpdateProfilePayload = (payload) => {
	const result = validate(updateProfileSchema, payload);
	return result.value;
};
