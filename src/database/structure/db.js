import {
	DB_HOST,
	DB_USER,
	DB_PASS,
	DB_NAME,
	DB_PORT,
} from "../../../constants.js";
import { createPool } from "mysql2/promise";

async function getDB() {
	try {
		const pool = await createPool({
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASS,
			database: DB_NAME,
			port: DB_PORT,
		});
		return pool;
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1);
	}
}

export const Db = getDB();
