import { Db } from './structure/db.js';

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
