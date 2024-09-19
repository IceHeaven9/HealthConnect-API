import { Db } from '../../structure/db.js';

// Funcion para obtener todas las consultas sin asignarse a un doctor

export const getUnassignedConsultationsBySpecialityId = async (
	req,
	specialityIds
) => {
	const placeholders = specialityIds.map(() => '?').join(',');

	const limit = parseInt(req.query.limit, 10) || 10;
	const offset = parseInt(req.query.offset, 10) || 0;

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
    ORDER BY c.date ASC
    LIMIT ? OFFSET ?`,
		[...specialityIds, limit, offset]
	);

	return consultations.length > 0 ? consultations : [];
};
