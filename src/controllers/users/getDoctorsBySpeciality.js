import { getDoctorsBySpecialityId } from '../../database/services/users/getDoctorsBySpecialityId.js';

export async function getDoctorsBySpecialityController(req, res, next) {
	const { specialityId } = req.params;
	const doctors = await getDoctorsBySpecialityId(specialityId);
	res.json(doctors);
}
