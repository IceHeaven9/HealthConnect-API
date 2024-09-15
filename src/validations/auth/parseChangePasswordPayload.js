import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el cambio de contraseña

const schema = Joi.object({
	oldPassword: Joi.string().min(8).max(60).required(),
	newPassword1: Joi.string().min(8).max(60).required(),
	newPassword2: Joi.any()
		.valid(Joi.ref('newPassword1'))
		.required()
		.messages({ 'any.only': 'Passwords do not match' }),
});
export function parseChangePasswordPayload(payload) {
	const result = validate(schema, payload);
	return result.value;
}
