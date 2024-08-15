import "dotenv/config";

export const API_HOST = process.env.API_HOST;

export const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

export const { JWT_SECRET } = process.env;
