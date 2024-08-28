// Controlador para editar una respuesta a una consulta (sólo el doctor puede hacerlo, y solo si está sin valorar)

export const editResponseController = async (req, res) => {
	const user = req.currentUser;
	const { consultationId, response } = req.body;

	if (user.userType !== 'doctor') {
		return res.status(403).json({
			error: 'UNAUTHORIZED',
			message: 'Acceso no autorizado',
		});
	}

	const updateResponse = await updateResponse(consultationId, response);

	if (!updateResponse) {
		return res.status(404).json({
			error: 'RESPONSE_NOT_FOUND',
			message: 'Respuesta no encontrada',
		});
	}

	if (updateResponse.rating) {
		return res.status(403).json({
			error: 'RESPONSE_ALREADY_RATED',
			message: 'Esta respuesta ya ha sido valorada',
		});
	}

	res.status(200).json({ message: 'Respuesta editada' });
};
