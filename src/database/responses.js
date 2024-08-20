import { Db } from "./structure/db.js";

export const setResponse = async (content, id, userId, rating) => {
	const newResponse = await Db.query(
		`INSERT INTO responses (content, consultationId, doctorId, rating) VALUES (:content, :id, :userId, :rating)`,
		{ content, id, userId, rating }
	);

	return newResponse;
};
