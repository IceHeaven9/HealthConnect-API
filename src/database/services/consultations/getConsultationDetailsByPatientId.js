import { Db } from './structure/db.js';

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
