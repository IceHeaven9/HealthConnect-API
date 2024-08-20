import { Db } from "../../database/structure/db.js";

export const createResponsesController = async (req, res) => {
	const { id } = req.params;
	const { content, rating } = req.body;
	const userId = req.currentUser.id;
	const userType = req.currentUser.userType;

	const [consultation] = await Db.query(
		"SELECT * FROM consultations WHERE id = ?",
		[id]
	);

	if (!consultation) {
		return res.status(404).json({ message: "Consulta no encontrada" });
	}

	if (
		(userType === "paciente" && consultation.patientId !== userId) ||
		(userType === "doctor" &&
			consultation.doctorId !== userId &&
			consultation.specialityId !== req.currentUser.specialityId)
	) {
		return res.status(403).json({ message: "No autorizado" });
	}

	await Db.query(
		`INSERT INTO responses (content, consultationId, doctorId, rating) VALUES (:content, :id, :userId, :rating)`,
		{ content, id, userId, rating }
	);
	res.status(201).json({ message: "Respuesta creada exitosamente" });
};
