import { generateErrors } from '../utils/generateErrors.js';
import { Db } from './structure/db.js';

// Funcion para crear una consulta

export const createConsultation = async ({
	title,
	description,
	severity,
	specialityid,
	patientId,
	date,
}) => {
	const [result] = await Db.query(
		`INSERT INTO consultations (date, title, description, severity, specialityid, patientId) VALUES (?, ?, ?, ?, ?, ?)`,
		[date, title, description, severity, specialityid, patientId]
	);
	return result.insertId;
};

// Funcion para obtener todas las consultas

export const getAllConsultations = async (req = {}) => {
	const {
		title,
		severity,
		doctorName,
		specialityName,
		patientName,
		date,
		status,
	} = req.query;

	const [consultations] = await Db.query(
		`
        SELECT DISTINCT
            c.id,
            c.date,
            c.title,
            c.severity,
            c.description,
            c.status,
            CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
            s.name AS specialityName,
            CONCAT(p.firstName, ' ', p.lastName) AS patientName,
            r.content AS responseContent
        FROM 
            consultations c
        LEFT JOIN 
            users d ON c.doctorId = d.id
        LEFT JOIN 
            users p ON c.patientId = p.id
        LEFT JOIN 
            responses r ON c.id = r.consultationId
        JOIN 
            specialities s ON c.specialityId = s.id
        WHERE 
            (? IS NULL OR c.title LIKE ?) AND
            (? IS NULL OR c.severity LIKE ?) AND
            (? IS NULL OR CONCAT(d.firstName, ' ', d.lastName) LIKE ?) AND
            (? IS NULL OR s.name LIKE ?) AND
            (? IS NULL OR CONCAT(p.firstName, ' ', p.lastName) LIKE ?) AND
            (? IS NULL OR c.date = ?) AND
            (? IS NULL OR c.status LIKE ?)
        ORDER BY c.id ASC
        `,
		[
			title ? `%${title}%` : null,
			title ? `%${title}%` : null,
			severity ? `%${severity}%` : null,
			severity ? `%${severity}%` : null,
			doctorName ? `%${doctorName}%` : null,
			doctorName ? `%${doctorName}%` : null,
			specialityName ? `%${specialityName}%` : null,
			specialityName ? `%${specialityName}%` : null,
			patientName ? `%${patientName}%` : null,
			patientName ? `%${patientName}%` : null,
			date || null,
			date || null,
			status ? `%${status}%` : null,
			status ? `%${status}%` : null,
		]
	);

	return consultations;
};

// Función para obtener los datos de una consulta por id de consulta y solo si coincide con el id del paciente

export const getConsultationDetailsByPatientId = async (req, res) => {
	const userId = req.currentUser.id;
	const consultationId = req.params.id;

	const [rows] = await Db.query(
		`
        SELECT DISTINCT
            c.id,
            c.date,
            c.title,
            c.severity,
            c.description,
            c.status,
            c.doctorId, 
            u.avatar AS patientAvatar,
            u.firstName AS patientName,
            u.email AS patientEmail,
            d.avatar AS doctorAvatar,
            CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
            d.email AS doctorEmail,
            s.name AS specialityName,
            r.content AS responseContent,
            r.rating
        FROM 
            consultations c
        LEFT JOIN 
            users u ON c.patientId = u.id
        LEFT JOIN 
            responses r ON c.id = r.consultationId
        LEFT JOIN 
            users d ON c.doctorId = d.id
        JOIN 
            specialities s ON c.specialityId = s.id
        WHERE 
            c.id = ? AND
            c.patientId = ?
        GROUP BY 
            c.id,
            c.date,
            c.title,
            c.severity,
            c.description,
            c.status,
            c.doctorId,  
            u.avatar,
            u.firstName,
            u.email,
            d.avatar,
            d.firstName,
            d.lastName,
            d.email,
            s.name,
            r.content,
            r.rating
    `,
		[consultationId, userId]
	);

	if (rows.length === 0) {
		return [];
	}
	return rows[0];
};
// Función para obtener una consulta por el id de la consulta

export const getConsultationsDetailsByDoctorId = async (req, res) => {
	const userId = req.currentUser.id;
	const consultationId = req.params.id;

	const [rows] = await Db.query(
		`
      SELECT DISTINCT
            c.id,
            c.date,
            c.title,
            c.severity,
            c.description,
            c.status,
            u.avatar AS patientAvatar,
            u.firstName AS patientName,
            u.email AS patientEmail,
            d.avatar AS doctorAvatar,
            CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
            d.email AS doctorEmail,
            s.name AS specialityName,
            r.content AS responseContent,
            r.rating
        FROM 
            consultations c
        LEFT JOIN 
            users u ON c.patientId = u.id
        LEFT JOIN 
            responses r ON c.id = r.consultationId
        LEFT JOIN 
            users d ON c.doctorId = d.id
        JOIN 
            specialities s ON c.specialityId = s.id
        WHERE 
            c.id = ? AND
            c.doctorId = ?
        GROUP BY 
            c.id,
            c.date,
            c.title,
            c.severity,
            c.description,
            c.status,
            u.avatar,
            u.firstName,
            u.email,
            d.avatar,
            d.firstName,
            d.lastName,
            d.email,
            s.name,
            r.content,
            r.rating
    `,
		[consultationId, userId]
	);

	if (rows.length === 0) {
		return [];
	}

	return rows[0];
};

// Funcion para obtener el resumen de una consulta por id

export const getConsultationById = async (id) => {
	const [consultation] = await Db.query(
		`
        SELECT 
            c.id,
            c.title,
            c.doctorId,
            CONCAT(d.firstName, ' ', d.lastName) AS doctor,
            CONCAT(p.firstName, ' ', p.lastName) AS patient,
            s.name AS speciality,
            c.severity,
            c.date,
            c.status,
            c.description,
            c.patientId
        FROM 
            consultations c
        LEFT JOIN 
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

export const getDoctorsConsultationsBySpecialityId = async (
	req,
	specialityIds
) => {
	const { title, severity, patientName, specialityName } = req.query;
	const placeholders = specialityIds.map(() => '?').join(',');
	const [consultations] = await Db.query(
		`SELECT DISTINCT
        c.id,
        c.date,
        c.title,
        c.severity,
        c.description,
        CONCAT(u.firstName, ' ', u.lastName) AS patientName,
        u.avatar AS patientAvatar,
        CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
        d.avatar AS doctorAvatar,
        s.name AS specialityName,
        c.status
    FROM 
        consultations c
    LEFT JOIN 
        users u ON c.patientId = u.id
    LEFT JOIN 
        users d ON c.doctorId = d.id
    JOIN 
        specialities s ON c.specialityId = s.id
    WHERE 
        c.specialityId IN (${placeholders}) AND
        (? IS NULL OR c.title LIKE ?) AND
        (? IS NULL OR c.severity LIKE ?) AND
        (? IS NULL OR u.firstName LIKE ?) AND
        (? IS NULL OR s.name LIKE ?)
    GROUP BY 
        c.id,
        c.date,
        c.title,
        c.severity,
        c.description,
        u.firstName,
        u.lastName,
        u.avatar,
        d.firstName,
        d.lastName,
        d.avatar,
        s.name,
        c.status
    ORDER BY c.id ASC`,
		[
			...specialityIds,
			title ? `%${title}%` : null,
			title ? `%${title}%` : null,
			severity ? `%${severity}%` : null,
			severity ? `%${severity}%` : null,
			patientName ? `%${patientName}%` : null,
			patientName ? `%${patientName}%` : null,
			specialityName ? `%${specialityName}%` : null,
			specialityName ? `%${specialityName}%` : null,
		]
	);

	if (consultations.length === 0) {
		return [];
	}
	return consultations;
};

// Funcion para obtener todas las consultas con filtros de un paciente

export const getPatientsConsultations = async (req, res) => {
	const { title, severity, specialityName, startDate, endDate, status } =
		req.query;

	const patientId = req.currentUser.id;

	const [rows] = await Db.query(
		`
            SELECT DISTINCT
                c.id,
                c.date,
                c.title,
                c.severity,
                c.description,
                CONCAT(u.firstName, ' ', u.lastName) AS patientName,
                u.avatar AS patientAvatar,
                CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
                d.avatar AS doctorAvatar,
                s.name AS specialityName,
                c.status
            FROM 
                consultations c
            LEFT JOIN 
                users u ON c.patientId = u.id
            LEFT JOIN 
                users d ON c.doctorId = d.id
            JOIN 
                specialities s ON c.specialityId = s.id
            WHERE 
                c.title LIKE ? AND
                c.severity LIKE ? AND
                s.name LIKE ? AND
                c.patientId = ? AND
                (? IS NULL OR c.date >= ?) AND
                (? IS NULL OR c.date <= ?) AND
                (? IS NULL OR c.status LIKE ?)
            GROUP BY 
                c.id,
                c.date,
                c.title,
                c.severity,
                c.description,
                u.firstName,
                u.lastName,
                u.avatar,
                d.firstName,
                d.lastName,
                d.avatar,
                s.name,
                c.status
            ORDER BY c.id ASC;
        `,
		[
			`%${title || ''}%`,
			`%${severity || ''}%`,
			`%${specialityName || ''}%`,
			patientId,
			startDate || null,
			startDate || null,
			endDate || null,
			endDate || null,
			status ? `%${status}%` : null,
			status ? `%${status}%` : null,
		]
	);

	if (rows.length === 0) {
		return [];
	}
	return rows;
};

// Funcion para obtener todas las consultas sin asignarse a un doctor

export const getUnassignedConsultationsBySpecialityId = async (
	req,
	specialityIds
) => {
	const placeholders = specialityIds.map(() => '?').join(',');

	const [consultations] = await Db.query(
		`SELECT DISTINCT
        c.id,
        c.date,
        c.title,
        c.severity,
        c.description,
        CONCAT(u.firstName, ' ', u.lastName) AS patientName,
        u.avatar AS patientAvatar,
        CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
        d.avatar AS doctorAvatar,
        s.name AS specialityName,
        c.status
    FROM 
        consultations c
    LEFT JOIN 
        users u ON c.patientId = u.id
    LEFT JOIN 
        users d ON c.doctorId = d.id
    JOIN 
        specialities s ON c.specialityId = s.id
    WHERE 
        c.specialityId IN (${placeholders}) AND
        c.status = 'pending' AND
        c.doctorId IS NULL
    ORDER BY c.id ASC`,
		[...specialityIds]
	);

	return consultations.length > 0 ? consultations : [];
};

// Funcion para obtener el id del doctor

export const setDoctorId = async (doctorId, consultationId) => {
	// Verificar si el doctorId existe en la tabla users
	const [[doctor]] = await Db.query(
		'SELECT id FROM users WHERE id = ? AND userType = "doctor"',
		[doctorId]
	);

	if (doctor.length === 0) {
		throw generateErrors(404, 'NOT_FOUND', 'Doctor no encontrado');
	}
	// Funcion para comprobar si la consulta ya tiene un doctor asignado

	const [[consultation]] = await Db.query(
		'SELECT doctorId FROM consultations WHERE id = ?',
		[consultationId]
	);

	if (consultation.doctorId !== null) {
		throw generateErrors(
			400,
			'BAD_REQUEST',
			'La consulta ya tiene un doctor asignado'
		);
	}

	// Si el doctor existe, proceder con la actualización
	const [setDoctor] = await Db.query(
		'UPDATE consultations SET doctorId = ? WHERE id = ?',
		[doctorId, consultationId]
	);

	return setDoctor.affectedRows;
};

// Funcion para modificar el title de una consulta

export const modifyTitleConsultation = async (id, title) => {
	const modify = await Db.query(
		'UPDATE consultations SET title = ? WHERE id = ?',
		[title, id]
	);
	return modify;
};

// Funcion para modificar la descripcion de una consulta

export const modifyDescriptionConsultation = async (id, description) => {
	const modify = await Db.query(
		'UPDATE consultations SET description = ? WHERE id = ?',
		[description, id]
	);
	return modify;
};

// Funcion para modificar la severidad de una consulta

export const modifySeverityConsultation = async (id, severity) => {
	const modify = await Db.query(
		'UPDATE consultations SET severity = ? WHERE id = ?',
		[severity, id]
	);
	return modify;
};

// Funcion para obtener el status de una consulta

export const getStatusConsultation = async (id) => {
	const getStatus = await Db.query(
		'SELECT status FROM consultations WHERE id = ?',
		[id]
	);
	return getStatus;
};

// Funcion para cancelar una consulta

export const cancelConsultation = async (id) => {
	const result = await Db.query(
		'UPDATE consultations SET status = "cancelled" WHERE id = ?',
		[id]
	);
	return result;
};

// Función para obtener las consultas finalizadas con filtros, búsqueda y ordenación

export const getFinishedConsultations = async (req, res) => {
	const userId = req.currentUser.id;
	const { title, severity, doctorName, specialityName, sortBy, sortOrder } =
		req.query;

	const [rows] = await Db.query(
		`
            SELECT DISTINCT
                c.id,
                c.date,
                c.title,
                c.severity,
                c.description,
                c.status,
                MAX(fc.fileName) AS consultationFileName,
                MAX(fc.filePath) AS consultationFilePath,
                MAX(fr.fileName) AS responseFileName,
                MAX(fr.filePath) AS responseFilePath,
                MAX(u.avatar) AS patientAvatar,
                MAX(u.firstName) AS patientName,
                MAX(u.email) AS patientEmail,
                MAX(d.avatar) AS doctorAvatar,
                CONCAT(MAX(d.firstName), ' ', MAX(d.lastName)) AS doctorName,
                MAX(s.name) AS specialityName
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
                c.patientId = ? AND
                c.status = 'completed' AND
                c.title LIKE ? AND
                c.severity LIKE ? AND
                CONCAT(d.firstName, ' ', d.lastName) LIKE ? AND
                s.name LIKE ?
            GROUP BY c.id
            ORDER BY ${sortBy || 'c.id'} ${sortOrder || 'DESC'};
        `,
		[
			userId,
			`%${title || ''}%`,
			`%${severity || ''}%`,
			`%${doctorName || ''}%`,
			`%${specialityName || ''}%`,
		]
	);

	if (rows.length === 0) {
		return [];
	}

	res.json(rows);
};
// Función para obtener las consultas futuras de un paciente con filtros, búsqueda y ordenación

export const getFutureConsultations = async (req) => {
	const userId = req.currentUser.id;
	const { title, severity, doctorName, specialityName, sortBy, sortOrder } =
		req.query;

	const [rows] = await Db.query(
		`
            SELECT 
                c.id,
                c.date,
                c.title,
                c.severity,
                c.description,
                c.status,
                MAX(fc.fileName) AS consultationFileName,
                MAX(fc.filePath) AS consultationFilePath,
                MAX(fr.fileName) AS responseFileName,
                MAX(fr.filePath) AS responseFilePath,
                MAX(u.avatar) AS patientAvatar,
                MAX(u.firstName) AS patientName,
                MAX(u.email) AS patientEmail,
                MAX(d.avatar) AS doctorAvatar,
                CONCAT(MAX(d.firstName), ' ', MAX(d.lastName)) AS doctorName,
                MAX(s.name) AS specialityName
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
                c.patientId = ? AND
                c.date > NOW() AND
                (c.title LIKE ? OR ? IS NULL) AND
                (c.severity LIKE ? OR ? IS NULL) AND
                (CONCAT(d.firstName, ' ', d.lastName) LIKE ? OR ? IS NULL) AND
                (s.name LIKE ? OR ? IS NULL)
            GROUP BY 
                c.id, c.date, c.title, c.severity, c.description, c.status
            ORDER BY ${sortBy || 'c.date'} ${sortOrder || 'ASC'};
        `,
		[
			userId,
			`%${title || ''}%`,
			title,
			`%${severity || ''}%`,
			severity,
			`%${doctorName || ''}%`,
			doctorName,
			`%${specialityName || ''}%`,
			specialityName,
		]
	);

	return rows;
};

// Función para insertar archivos a una consulta

export const uploadConsultationFiles = async (id, files) => {
	const insertPromises = files.map(async ({ fileName, filePath }) => {
		await Db.query(
			'INSERT INTO files_consultations (consultationId, fileName, filePath) VALUES (?, ?, ?)',
			[id, fileName, filePath]
		);
		return { fileName, filePath };
	});

	return await Promise.all(insertPromises);
};

//   Funcion para borrar archivos de una consulta

export const deleteConsultationFile = async (consultationId, fileName) => {
	const query =
		'DELETE FROM files_consultations WHERE consultationId = ? AND fileName = ?';
	const [result] = await Db.query(query, [consultationId, fileName]);
	return result;
};

// Función para obtener las consultas de un paciente por su fecha

export const getConsultationByDateAndPatientId = async (date, patientId) => {
	const query = 'SELECT * FROM consultations WHERE date = ? AND patientId = ?';
	const [rows] = await Db.query(query, [date, patientId]);
	return rows[0] || null;
};

// Funcion para obtener las consultas de un doctor por su fecha

export const getConsultationsByDateAndDoctorId = async (date, doctorId) => {
	const query = 'SELECT * FROM consultations WHERE date = ? AND doctorId = ?';
	const [rows] = await Db.query(query, [date, doctorId]);
	return rows[0] || null;
};

// Funcion para obtener los archivos de una consulta por su id

export const getConsultationFilesByConsultationId = async (consultationId) => {
	const query =
		'SELECT fileName, filePath FROM files_consultations WHERE consultationId = ?';
	const [rows] = await Db.query(query, [consultationId]);
	return rows || null;
};

// Funcion para obtener los archivos de una respuesta por su id

export const getResponseFilesByResponseId = async (responseId) => {
	const query =
		'SELECT fileName, filePath FROM files_responses WHERE responseId = ?';
	const [rows] = await Db.query(query, [responseId]);
	return rows || null;
};

// Funcion para obtener las consultas de un paciente ya pasadas y que aun tengan el status pending

export const getPendingConsultationsByPatientId = async (patientId) => {
	const query =
		'SELECT * FROM consultations WHERE patientId = ? AND status = "pending" AND date < NOW()';
	const [rows] = await Db.query(query, [patientId]);
	return rows || null;
};
