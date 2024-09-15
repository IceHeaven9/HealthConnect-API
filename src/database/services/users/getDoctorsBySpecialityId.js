import { Db } from './structure/db.js';

// Funcion para obtener los datos de los medicos por especialidad

export async function getDoctorsBySpecialityId(specialityId) {
	const [doctors] = await Db.query(
		`SELECT 
            u.id, 
            u.firstName, 
            u.lastName, 
            u.avatar,
            u.biography, 
            GROUP_CONCAT(s.name SEPARATOR ', ') AS specialities,
            (SELECT AVG(r.rating) 
             FROM responses r 
             JOIN consultations c ON r.consultationId = c.id 
             WHERE c.doctorId = u.id) AS averageRating
        FROM 
            users u
        JOIN 
            user_specialities us ON u.id = us.userId
        JOIN 
            specialities s ON us.specialityId = s.id
        WHERE 
            s.id = :specialityId AND u.userType = 'doctor'
        GROUP BY 
            u.id`,
		{ specialityId }
	);
	return doctors;
}
