import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para la modificacion del perfil de usuario

const updateProfileSchema = Joi.object({
	firstName: Joi.string().min(3).max(50),
	lastName: Joi.string().min(3).max(100),
	userName: Joi.string().min(3).max(40),
	biography: Joi.string().min(3).max(5000),
	experience: Joi.number().min(0).max(60),
});

export const parseUpdateProfilePayload = (payload) => {
	const result = validate(updateProfileSchema, payload);
	return result.value;
};
