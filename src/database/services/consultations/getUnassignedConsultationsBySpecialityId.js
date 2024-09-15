import { Db } from './structure/db.js';

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
