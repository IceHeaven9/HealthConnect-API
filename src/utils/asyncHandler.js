// Función que recibe un controlador y retorna una nueva función que maneja errores asincrónicos

export function asyncHandler(controller) {
	return async (req, res, next) => {
		try {
			await controller(req, res);
		} catch (err) {
			next(err);
		}
	};
}
