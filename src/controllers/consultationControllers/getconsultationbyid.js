import { getConsultationDetails } from "../../database/consultation.js";

// Función para obtener los datos de una consulta
export const getConsultationDetailsController = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		throw generateErrors(400, "INVALID_REQUEST", "Missing consultation ID");
	}

	const consultation = await getConsultationDetails(id);
	res.status(200).json(consultation);
};
