import { Db } from '../../structure/db.js';

// Funcion para obtener todas las consultas con filtros de un paciente

export const getPatientsConsultations = async (req, res) => {
	const {
		title,
		severity,
		specialityName,
		startDate,
		endDate,
		status,
		description,
	} = req.query;

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
                c.description LIKE ? AND
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
			`%${description || ''}%`,
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
