import 'dotenv/config';
import path from 'path';

// Variables de entorno

export const {
	//==========================
	// API SETTINGS
	//==========================
	PORT,
	JWT_SECRET,
	FRONTEND_HOST,
	API_HOST = 'http://localhost:3000',
	CODIGO_MEDICO,

	//==========================
	// DB SETTINGS
	//==========================
	DB_HOST,
	DB_USER,
	DB_PASS,
	DB_NAME,
	DB_PORT,

	//==========================
	// EMAIL SETTINGS
	//==========================
	EMAIL_HOST,
	EMAIL_PORT,
	EMAIL_USER,
	EMAIL_PASS,
} = process.env;

export const PUBLIC_DIR = path.join(process.cwd(), 'public');
