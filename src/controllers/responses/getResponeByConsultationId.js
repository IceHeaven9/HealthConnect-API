import { Db } from "../../database/structure/db.js";
import { findUserById } from "../../database/users.js";

export const getResponseByConsultationIdController = async (req, res) => {
	const { id } = req.params;
	const userId = req.body.id;
	const userType = req.body.userType;
	console.log(userType);

	if (!userType) {
		return res.status(404).json({
			message: "Usuario no encontrado",
		});
	}
	const query = `
      SELECT 
        c.title,
        c.description,
        c.severity,
        s.name AS speciality,
        c.date,
        CONCAT(p.firstName, ' ', p.lastName) AS patient,
        CONCAT(d.firstName, ' ', d.lastName) AS doctor
      FROM 
        consultations c
      JOIN 
        users p ON c.patientId = p.id
      JOIN 
        users d ON c.doctorId = d.id
      JOIN 
        specialities s ON c.specialityId = s.id
      WHERE 
        c.id = ? AND d.id = ?
    `;

	const [rows] = await Db.query(query, [id, userId]);

	if (rows.length === 0) {
		return res.status(404).json({
			message: "Consulta no encontrada o no tiene permiso para verla",
		});
	}

	res.status(200).json(rows[0]);
};
