import { getDoctorsBySpecialityId } from '../../database/users.js';

export async function getDoctorsBySpecialityController(req, res, next) {
	const { specialityId } = req.params;
	const doctors = await getDoctorsBySpecialityId(specialityId);
	res.json(doctors);
}
