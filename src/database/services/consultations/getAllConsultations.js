import { Db } from '../../structure/db.js';

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
