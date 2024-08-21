import { generateErrors } from "../utils/generateErrors.js";
import { Db } from "./structure/db.js";

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

// Función para obtener los datos de una consulta por id de consulta y solo si coincide con el id del paciente
export const getConsultationDetails = async (req, res) => {
	const userId = req.currentUser.id;
	const consultationId = req.params.id;

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
                c.id = ? AND
                c.patientId = ?
            GROUP BY 
                c.id;
        `,
		[consultationId, userId]
	);

	if (rows.length === 0) {
		throw generateErrors(404, "SERVER_ERROR", "Consulta no encontrada");
	}

	res.status(200).json(rows[0]);
};

// Función para obtener una consulta por el id de la consulta y solo si coincide con la especialidad del doctor
export const getConsultationsById_BySpecialityId = async (
	userId,
	specialityId
) => {
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
                  c.doctorId = ? AND
                  c.specialityId = ?
              GROUP BY 
                  c.id,
                  c.title,
                  d.firstName,
                  d.lastName,
                  s.name,
                  c.severity,
                  c.date,
                  p.firstName,
                  p.lastName;
          `,
		[userId, specialityId]
	);
	return rows;
};

// Funcion para obtener todas las consultas de un paciente
export const getConsultations = async (req, res) => {
	const { title, speciality, severity, orderBy } = req.query;

	const patientId = req.currentUser.id;

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
                c.patientId = ?
            GROUP BY 
                c.id
            ORDER BY 
                ${orderBy || "c.date DESC"};
        `,
		[
			`%${title || ""}%`,
			`%${speciality || ""}%`,
			`%${severity || ""}%`,
			patientId,
		]
	);

	res.status(200).json(rows);
};

// Funcion para obtener una consulta por id
// Se utiliza para obtener una consulta sin condiciones
export const getConsultationById = async (id) => {
	const [consultation] = await Db.query(
		`
        SELECT 
            c.title,
            CONCAT(d.firstName, ' ', d.lastName) AS doctor,
            CONCAT(p.firstName, ' ', p.lastName) AS patient,
            s.name AS speciality,
            c.severity,
            c.date,
            c.status
        FROM 
            consultations c
        JOIN 
            users d ON c.doctorId = d.id
        JOIN 
            users p ON c.patientId = p.id
        JOIN 
            specialities s ON c.specialityId = s.id
        WHERE 
            c.id = ?
        `,
		[id]
	);
	return consultation;
};

// Funcion para obtener todas las consultas por la id de su especialidad
export const getConsultationsBySpecialityId = async (specialityId) => {
	const [consultations] = await Db.query(
		`SELECT 
        c.id,
        c.description,
        c.status,
        fc.fileName AS consultationFileName,
        fc.filePath AS consultationFilePath,
        fr.fileName AS responseFileName,
        fr.filePath AS responseFilePath,
        u.avatar,
        u.firstName AS patientName,
        u.email AS patientEmail,
        r.rating,
        CONCAT(d.firstName, ' ', d.lastName) AS doctorName
    FROM 
        consultations c
    LEFT JOIN 
        files_consultations fc ON c.id = fc.consultationId
    LEFT JOIN 
        files_responses fr ON c.id = fr.responseId
    LEFT JOIN 
        users u ON c.patientId = u.id
    LEFT JOIN 
        responses r ON c.id = r.consultationId
    LEFT JOIN 
        users d ON c.doctorId = d.id
    WHERE 
        c.specialityId = ?`,
		[specialityId]
	);
	return consultations;
};
