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
		return res.status(400).json({ mensaje: "Faltan datos necesarios" });
	}

	const idConsultation = await crearCita({
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
