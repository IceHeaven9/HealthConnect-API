import { Db } from "./structure/db.js";

export const createConsultation = async ({
	title,
	description,
	severity,
	specialityid,
	patientid,
	doctorid,
	date,
}) => {
	const [result] = await Db.query(
		`INSERT INTO consultation (title, descripcion,severity, specialyid,parentid,doctorid,date) VALUES ( :title, :description, :severity, :specialityid, :patientid, :doctorid, :date)`,
		[title, description, severity, specialityid, patientid, doctorid, date]
	);
	return result.insertid;
};
