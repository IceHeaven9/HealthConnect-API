import {
	errorLog,
	infoLog,
	succesLog,
	warningLog,
} from "../../utils/logger.js";
import { getPool } from "./getPool.js";

async function initDB() {
	try {
		const pool = await getPool();
		const connection = await pool.getConnection();

		warningLog("Eliminando base de datos si existe");
		await connection.query("DROP DATABASE IF EXISTS citas_medicas");

		await connection.query("CREATE DATABASE citas_medicas");
		succesLog("Base de datos citas_medicas creada.");

		await connection.query("USE citas_medicas");
		infoLog("DB en uso: citas_medicas");

		warningLog("Eliminando tablas si existen");
		await connection.query(
			"DROP TABLE IF EXISTS ratings, responses, consultations, users, specialties"
		);

		infoLog("Creando tablas...");

		await connection.query(`
            CREATE TABLE specialties (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

		succesLog("Tabla Specialties creada.");

		await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                userName VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                userType ENUM('paciente', 'doctor') NOT NULL,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(100) DEFAULT NULL,
                biography VARCHAR(500) DEFAULT NULL,
                avatar VARCHAR(255) DEFAULT NULL,
                specialtyId INT DEFAULT NULL,
                experience INT DEFAULT NULL,
                mediaRating FLOAT DEFAULT NULL,
                codigoMedico INT DEFAULT NULL,
                validationCode INT UNIQUE,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (specialtyId) REFERENCES specialties(id)
            )
        `);

		succesLog("Tabla Users creada.");

		await connection.query(`
            CREATE TABLE consultations (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                date DATETIME DEFAULT CURRENT_TIMESTAMP,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                specialtyId INT NOT NULL,
                severity ENUM('high', 'medium', 'low') NOT NULL,
                patientId INT NOT NULL,
                doctorId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (specialtyId) REFERENCES specialties(id),
                FOREIGN KEY (patientId) REFERENCES users(id),
                FOREIGN KEY (doctorId) REFERENCES users(id)
            )
        `);

		succesLog("Tabla consultations creada.");

		await connection.query(`
            CREATE TABLE responses (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                content TEXT NOT NULL,
                consultationId INT NOT NULL,
                doctorId INT NOT NULL,
                rating INT DEFAULT NULL,
                date DATETIME DEFAULT CURRENT_TIMESTAMP,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (consultationId) REFERENCES consultations(id),
                FOREIGN KEY (doctorId) REFERENCES users(id)
            )
        `);

		succesLog("Tabla responses creada.");

		await connection.query(`
            CREATE TABLE ratings (
            id INT PRIMARY KEY AUTO_INCREMENT,
            userId INT NOT NULL,
            consultationId INT NOT NULL,
            rating INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (consultationId) REFERENCES consultations(id)
        )
            `);

		succesLog("Tabla ratings creada.");

		infoLog("¡Todas las tablas creadas exitosamente!");
		process.exit(0);
	} catch (error) {
		errorLog("Error al crear las tablas:", error);
		process.exit(1);
	}
}

initDB();
