import { Db } from "./structure/db.js";

// Funcion para crear una consulta
// Funcion para crear una consulta
export const createConsultation = async ({
	title,
	description,
	severity,
	specialityid,
	id,
	doctorid,
	date,
}) => {
	const [result] = await Db.query(
		`INSERT INTO consultations (title, description, severity, specialityid, patientId, doctorid, date) VALUES (?, ?, ?, ?, ?, ?,?)`,
		[title, description, severity, specialityid, id, doctorid, date]
	);
	return result.insertId;
};

// Funcion para obtener los datos de una consulta por id
export const getConsultationDetails = async (req, res) => {
	const id = req.params.id;

	try {
		const [rows] = await Db.query(
			`
            SELECT 
                c.title,
                CONCAT(d.firstName, ' ', d.lastName) AS doctor,
                s.name AS speciality,
                c.severity,
                c.date,
                CONCAT(p.firstName, ' ', p.lastName) AS patient,
                COUNT(r.id) AS numberOfResponses
            FROM 
                consultations c
            JOIN 
                users d ON c.doctorId = d.id
            JOIN 
                users p ON c.patientId = p.id
            JOIN 
                specialities s ON c.specialityId = s.id
            LEFT JOIN 
                responses r ON c.id = r.consultationId
            WHERE 
                c.id = ?
            GROUP BY 
                c.id;
        `,
			[id]
		);

		res.status(200).json(rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al listar las consultas" });
	}
};

// Funcion para obtener todas las consultas
export const getConsultations = async (req, res) => {
	console.log(req.query);
	const { title, speciality, severity, patient, orderBy } = req.query;

	console.log(title, speciality, severity, patient, orderBy);

	const [rows] = await Db.query(
		`
            SELECT 
                c.title,
                CONCAT(d.firstName, ' ', d.lastName) AS doctor,
                s.name AS speciality,
                c.severity,
                c.date,
                CONCAT(p.firstName, ' ', p.lastName) AS patient,
                COUNT(r.id) AS numberOfResponses
            FROM 
                consultations c
            JOIN 
                users d ON c.doctorId = d.id
            JOIN 
                users p ON c.patientId = p.id
            JOIN 
                specialities s ON c.specialityId = s.id
            LEFT JOIN 
                responses r ON c.id = r.consultationId
            WHERE 
                c.title LIKE ? AND
                s.name LIKE ? AND
                c.severity LIKE ? AND
                CONCAT(p.firstName, ' ', p.lastName) LIKE ?
            GROUP BY 
                c.id
            ORDER BY 
                ${orderBy || "c.date DESC"};
        `,
		[
			`%${title || ""}%`,
			`%${speciality || ""}%`,
			`%${severity || ""}%`,
			`%${patient || ""}%`,
		]
	);

	res.status(200).json(rows);
};

export const getConsultationById = async (id) => {
	const [consultation] = await Db.query(
		"SELECT * FROM consultations WHERE id = ?",
		[id]
	);
	return consultation;
};
