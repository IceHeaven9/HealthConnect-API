import "dotenv/config";

export const {
	//==========================
	// API SETTINGS
	//==========================
	API_HOST,
	JWT_SECRET,
	FRONTEND_HOST,

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
