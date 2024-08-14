import { getPool } from './getPool.js';


const initDB = async () => {
    try {
        let pool = await getPool();

        console.log('Eliminando base de datos si existe');
        await pool.query('DROP DATABASE IF EXISTS citas_medicas');
        
        console.log('Creando base de datos citas_medicas');
        await pool.query('CREATE DATABASE citas_medicas');
        await pool.query('USE citas_medicas');
        
        console.log('Eliminando tablas si existen');
        await pool.query('DROP TABLE IF EXISTS Responses, Consultations, Users, Specialties');
        console.log('Creando tablas...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Specialties (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                userName VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                userType ENUM('paciente', 'doctor') NOT NULL,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) DEFAULT NULL,
                biography TEXT,
                avatar VARCHAR(255) DEFAULT NULL,
                specialtyId INT,
                experience INT,
                rating FLOAT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (specialtyId) REFERENCES Specialties(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Consultations (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                specialtyId INT,
                severity ENUM('high', 'medium', 'low') NOT NULL,
                patientId INT,
                doctorId INT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (specialtyId) REFERENCES Specialties(id),
                FOREIGN KEY (patientId) REFERENCES Users(id),
                FOREIGN KEY (doctorId) REFERENCES Users(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Responses (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                content TEXT NOT NULL,
                consultationId INT,
                doctorId INT,
                rating INT CHECK (rating >= 1 AND rating <= 5),
                date DATETIME DEFAULT CURRENT_TIMESTAMP,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (consultationId) REFERENCES Consultations(id),
                FOREIGN KEY (doctorId) REFERENCES Users(id)
            )
        `);

        console.log('¡Tablas creadas exitosamente!');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear las tablas:', error);
        process.exit(1);
    }
}

initDB();


