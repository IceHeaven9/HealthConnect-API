// Función que recibe un esquema de Joi y un objeto de datos, y valida los datos con el esquema

export function validate(schema, payload) {
	if (typeof schema.validate !== 'function') {
		throw new Error('El esquema proporcionado no es un esquema de Joi válido.');
	}

	const result = schema.validate(payload, {
		abortEarly: false,
		allowUnknown: false,
		stripUnknown: true,
	});
	if (result.error)
		throw {
			status: 400,
			name: 'VALIDATION_ERROR',
			message: result.error.message,
			details: result.error.details,
		};
	return result;
}
