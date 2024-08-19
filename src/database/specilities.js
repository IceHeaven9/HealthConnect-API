import { Db } from "../database/structure/db.js";

export const getSpecialities = async () => {
	const specialities = await Db.query(`SELECT * FROM specialities;`);

	return specialities;
};
