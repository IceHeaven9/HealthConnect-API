import { generateErrors } from '../utils/generateErrors.js';
import { Db } from './structure/db.js';

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
		throw generateErrors(404, 'SERVER_ERROR', 'Consulta no encontrada');
	}

	res.status(200).json(rows[0]);
};

// Función para obtener una consulta por el id de la consulta y solo si coincide con la especialidad del doctor
export const getConsultationsById_BySpecialityId = async (Id, specialityId) => {
	console.log(specialityId, Id);
	const [rows] = await Db.query(
		`
      SELECT 
        c.id,
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
		[Id, specialityId]
	);
	return rows;
};
// Funcion para obtener todas las consultas de un paciente
export const getConsultations = async (req, res) => {
	const { title, speciality, severity } = req.query;

	const patientId = req.currentUser.id;

	const [rows] = await Db.query(
		`
            SELECT DISTINCT
                c.id,
                c.title,
                c.severity,
                c.description,
                c.status,
                fc.fileName AS consultationFileName,
                fc.filePath AS consultationFilePath,
                fr.fileName AS responseFileName,
                fr.filePath AS responseFilePath,
                u.avatar AS patientAvatar,
                u.firstName AS patientName,
                u.email AS patientEmail,
                r.rating,
                d.avatar AS doctorAvatar,
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
            JOIN 
                specialities s ON c.specialityId = s.id
            WHERE 
                c.title LIKE ? AND
                s.name LIKE ? AND
                c.severity LIKE ? AND
                c.patientId = ?
            GROUP BY 
                c.id,
                c.title,
                c.severity,
                c.description,
                c.status,
                fc.fileName,
                fc.filePath,
                fr.fileName,
                fr.filePath,
                u.avatar,
                u.firstName,
                u.email,
                r.rating,
                d.avatar,
                d.firstName,
                d.lastName
            ORDER BY c.id DESC;
        `,
		[
			`%${title || ''}%`,
			`%${speciality || ''}%`,
			`%${severity || ''}%`,
			patientId,
		]
	);

	// Eliminar duplicados
	const uniqueConsultations = Array.from(new Set(rows.map((c) => c.id))).map(
		(id) => rows.find((c) => c.id === id)
	);
	if (uniqueConsultations.length === 0) {
		throw generateErrors(404, 'SERVER_ERROR', 'Consultas no encontradas');
	}
	res.status(200).json(uniqueConsultations);
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
            c.status,
            c.severity,
            c.description
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
export const getConsultationsBySpecialityId = async (req, specialityId) => {
	const { title, severity } = req.query;
	const [consultations] = await Db.query(
		`SELECT DISTINCT
        c.id,
        c.title,
        c.severity,
        c.description,
        c.status,
        fc.fileName AS consultationFileName,
        fc.filePath AS consultationFilePath,
        fr.fileName AS responseFileName,
        fr.filePath AS responseFilePath,
        u.avatar AS patientAvatar,
        u.firstName AS patientName,
        u.email AS patientEmail,
        r.rating,
        d.avatar AS doctorAvatar,
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
    JOIN 
        specialities s ON c.specialityId = s.id
    WHERE 
        c.specialityId = ? AND
        c.title LIKE ? AND
        c.severity LIKE ?`,
		[specialityId, `%${title || ''}%`, `%${severity || ''}%`]
	);
	// Eliminar duplicados
	const uniqueConsultations = Array.from(
		new Set(consultations.map((c) => c.id))
	).map((id) => consultations.find((c) => c.id === id));

	if (uniqueConsultations.length === 0) {
		throw generateErrors(404, 'SERVER_ERROR', 'Consultas no encontradas');
	}
	return uniqueConsultations;
};
