import { createConsultation } from "../../database/consultation.js";
import { generateErrors } from "../../utils/generateErrors.js";

export const createConsultationController = async (req, res) => {
	const { title, description, severity, specialityid, doctorid, date } =
		req.body;

	const id = req.currentUser.id;
	console.log(id);
	// // if (
	// // 	!title ||
	// // 	!description ||
	// // 	!severity ||
	// // 	!specialityid ||
	// // 	!id ||
	// // 	!doctorid ||
	// // 	!date
	// // ) {
	// // 	throw generateErrors(
	// // 		400,
	// // 		"ValidationError",
	// // 		"Todos los campos son obligatorios"
	// // 	);
	// // }
	const idConsultation = await createConsultation({
		title,
		description,
		severity,
		specialityid,
		id,
		doctorid,
		date,
	});
	res.status(201).json({ mensaje: "Cita creada", id: idConsultation });
};
