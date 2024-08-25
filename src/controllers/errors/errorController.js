// Controlador para manejar errores en la aplicación

export const errorController = (error, req, res, next) => {
	res.status(error.httpStatus || 500).send({
		status: 'error',
		code: error.code || 'INTERNAL_SERVER_ERROR',
		message: error.message,
	});
};
