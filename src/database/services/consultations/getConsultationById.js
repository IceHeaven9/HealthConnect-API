import { Db } from './structure/db.js';

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
