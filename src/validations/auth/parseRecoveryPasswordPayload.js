import Joi from 'joi';
import { validate } from '../validate.js';

// Validaciones para el controlador de recuperación de contraseña

const recoveryPasswordSchema = Joi.object({
	email: Joi.string().email().max(255).required(),
});

export function parseRecoveryPasswordPayload(payload) {
	const result = validate(recoveryPasswordSchema, payload);
	return result.value;
}
