import { Db } from '../../structure/db.js';

// Funcion para obtener los datos de un medico por id

export const findDoctorById = async (id) => {
	const [[doctor]] = await Db.query(
		`SELECT 
            u.id, 
            CONCAT(u.firstName, ' ', u.lastName) AS fullName, 
            u.avatar, 
            u.biography, 
            u.experience,  
            u.userType,
            GROUP_CONCAT(s.name SEPARATOR ', ') AS specialities,
            GROUP_CONCAT(s.id SEPARATOR ', ') AS specialityIds,
            (SELECT AVG(r.rating) 
             FROM responses r 
             JOIN consultations c ON r.consultationId = c.id 
             WHERE c.doctorId = u.id) AS averageRating
        FROM 
            users u
        LEFT JOIN 
            user_specialities us ON u.id = us.userId
        LEFT JOIN 
            specialities s ON us.specialityId = s.id
        WHERE 
            u.id = ? AND u.userType = "doctor"
        GROUP BY 
            u.id`,
		[id]
	);

	if (!doctor) {
		throw generateErrors(404, 'NOT_FOUND', 'Doctor no encontrado');
	}

	return doctor;
};
