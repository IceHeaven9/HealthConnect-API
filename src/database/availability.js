import { Db } from './structure/db.js';
export const availabilityDoctors = async (specialityId, doctorId = null) => {
	let query =
			'SELECT u.id, u.firstName, u.lastName, u.avatar FROM users u JOIN user_specialities us ON u.id = us.userId WHERE us.specialityId = ? AND u.userType = "doctor"';
	const params = [specialityId];
	if (doctorId) {
			query += ' AND u.id = ?';
			params.push(doctorId);
	}

	const [rows] = await Db.query(query, params);
	return rows;
};

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