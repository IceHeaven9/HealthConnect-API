import { createConsultation } from "../../database/consultation.js";
import { generateErrors } from "../../utils/generateErrors.js";

export const createConsultationController = async (req, res) => {
	const {
		title,
		description,
		severity,
		specialityid,
		patientid,
		doctorid,
		date,
	} = req.body;

	if (
		!title ||
		!description ||
		!severity ||
		!specialityid ||
		!patientid ||
		!doctorid ||
		!date
	) {
		throw generateErrors(400, "Todos los campos son obligatorios");
	}

	const idConsultation = await createConsultation({
		title,
		description,
		severity,
		specialityid,
		patientid,
		doctorid,
		date,
	});
	res.status(201).json({ mensaje: "Cita creada", id: idConsultation });
};
