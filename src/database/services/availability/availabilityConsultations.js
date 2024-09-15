import { Db } from '../../structure/db.js';

export const availabilityConsultations = async (specialityId, date) => {
	const [rows] = await Db.query(
		`SELECT c.doctorId, c.date, u.avatar 
			FROM consultations c 
			JOIN users u ON c.doctorId = u.id 
			WHERE c.specialityId = ? AND DATE(c.date) = ?`,
		[specialityId, date]
	);
	return rows;
};
