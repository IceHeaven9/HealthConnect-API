import { Db } from '../../structure/db.js';

// Funcion para obtener todas las consultas por la id de su especialidad

export const getDoctorsConsultationsBySpecialityId = async (
	req,
	specialityIds
) => {
	const {
		title,
		severity,
		patientName,
		specialityName,
		startDate,
		endDate,
		doctorId,
		date,
		status,
		offset = 0,
		limit = 20,
	} = req.query;
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
        d.id AS doctorId,
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
        (? IS NULL OR s.name LIKE ?) AND
        (? IS NULL OR c.date >= ?) AND
        (? IS NULL OR c.date <= ?) AND
        (? IS NULL OR d.id = ?) AND
        (? IS NULL OR c.date = ?) AND
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
        d.id,
        s.name,
        c.status
    ORDER BY c.id ASC
    LIMIT ? OFFSET ?`,
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
			startDate || null,
			startDate || null,
			endDate || null,
			endDate || null,
			doctorId ? doctorId : null,
			doctorId ? doctorId : null,
			date || null,
			date || null,
			status ? `%${status}%` : null,
			status ? `%${status}%` : null,
			parseInt(limit, 10), // Asegurarse de que limit sea un número entero
			parseInt(offset, 10), // Asegurarse de que offset sea un número entero
		]
	);

	if (consultations.length === 0) {
		return [];
	}
	return consultations;
};
