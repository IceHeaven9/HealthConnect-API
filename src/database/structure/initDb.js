import {
	errorLog,
	infoLog,
	succesLog as succesLog,
	warningLog,
} from '../../utils/logger.js';
import { Db } from './db.js';

// Inicializacion de la base de datos
// Eliminación de la base de datos y las tablas si existe
// Creación de la base de datos y las tablas

async function initDB() {
	try {
		warningLog('Eliminando base de datos si existe');
		await Db.query('DROP DATABASE IF EXISTS citas_medicas');

		await Db.query('CREATE DATABASE citas_medicas');
		succesLog('Base de datos citas_medicas creada.');

		await Db.query('USE citas_medicas');
		infoLog('DB en uso: citas_medicas');

		warningLog('Eliminando tablas si existen');
		await Db.query(
			'DROP TABLE IF EXISTS files_responses, files_consultations, responses, doctors_consultations, consultations, user_specialities, users, specialities'
		);

		infoLog('Creando tablas...');

		await Db.query(`
            CREATE TABLE specialities (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

		succesLog('Tabla Specialities creada.');

		await Db.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(100) DEFAULT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                userType ENUM('patient', 'doctor') NOT NULL,
                userName VARCHAR(255) NOT NULL,
                biography VARCHAR(500) DEFAULT NULL,
                avatar VARCHAR(255) DEFAULT NULL,
                experience INT DEFAULT NULL,
                codigoMedico INT DEFAULT NULL,
                validationCode INT DEFAULT NULL,
                recoveryPasswordCode INT DEFAULT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

		succesLog('Tabla Users creada.');

		await Db.query(`
            CREATE TABLE user_specialities (
                userId INT NOT NULL,
                specialityId INT NOT NULL,
                PRIMARY KEY (userId, specialityId),
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (specialityId) REFERENCES specialities(id)
            )
        `);

		succesLog('Tabla intermedia User_Specialities creada.');

		await Db.query(`
            CREATE TABLE consultations (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                date DATETIME NOT NULL,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(500) DEFAULT NULL,
                severity ENUM('high', 'medium', 'low') DEFAULT 'low',
                patientId INT NOT NULL,
                specialityId INT NOT NULL,
                status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (specialityId) REFERENCES specialities(id),
                FOREIGN KEY (patientId) REFERENCES users(id)
            )
        `);

		succesLog('Tabla consultations creada.');

		await Db.query(`
            CREATE TABLE doctors_consultations (
                doctorId INT NOT NULL,
                consultationId INT NOT NULL,
                PRIMARY KEY (doctorId, consultationId),
                FOREIGN KEY (doctorId) REFERENCES users(id),
                FOREIGN KEY (consultationId) REFERENCES consultations(id)
            )
        `);

		succesLog('Tabla intermedia Doctors_Consultations creada.');

		await Db.query(`
            CREATE TABLE responses (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                content VARCHAR(5000) NOT NULL,
                consultationId INT NOT NULL,
                doctorId INT NOT NULL,
                rating INT DEFAULT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (consultationId) REFERENCES consultations(id),
                FOREIGN KEY (doctorId) REFERENCES users(id)
            )
        `);

		succesLog('Tabla responses creada.');

		await Db.query(`
            CREATE TABLE files_consultations (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                consultationId INT NOT NULL,
                fileName VARCHAR(255) NOT NULL,
                filePath VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (consultationId) REFERENCES consultations(id)
            )
        `);

		succesLog('Tabla files_consultations creada.');

		await Db.query(`
            CREATE TABLE files_responses (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                responseId INT NOT NULL,
                fileName VARCHAR(255) NOT NULL,
                filePath VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (responseId) REFERENCES responses(id)
            )
        `);

		succesLog('Tabla files_responses creada.');

		infoLog('¡Todas las tablas creadas exitosamente!');
		process.exit(0);
	} catch (error) {
		errorLog('Error al crear las tablas:', error);
		process.exit(1);
	}
}

initDB();
