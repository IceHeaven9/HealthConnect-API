import { Db } from "./structure/db.js";

// Funcion para crear una consulta
export const createConsultation = async ({
  title,
  description,
  severity,
  specialityId,
  patientId,
  doctorId,
  date,
}) => {
  const [result] = await Db.query(
    `INSERT INTO consultations (title, descripcion, severity, specialityId, parentId, doctorId,date) VALUES ( :title, :description, :severity, :specialityId, :patientId, :doctorId, :date)`,
    [title, description, severity, specialityId, patientId, doctorId, date]
  );
  return result.insertId;
};

// Funcion para obtener los datos de una consulta por id
export const getConsultationDetails = async (req, res) => {
  const { title, speciality, severity, patient, orderBy } = req.query;

  try {
    const [rows] = await Db.query(
      `
            SELECT 
                c.title,
                CONCAT(d.firstName, ' ', d.lastName) AS doctor,
                s.name AS speciality,
                c.severity,
                c.date,
                CONCAT(p.firstName, ' ', p.lastName) AS patient,
                COUNT(r.id) AS numberOfResponses
            FROM 
                consultations c
            JOIN 
                users d ON c.doctorId = d.id
            JOIN 
                users p ON c.patientId = p.id
            JOIN 
                specialities s ON c.specialityId = s.id
            LEFT JOIN 
                responses r ON c.id = r.consultationId
            WHERE 
                c.title LIKE ? AND
                s.name LIKE ? AND
                c.severity LIKE ? AND
                CONCAT(p.firstName, ' ', p.lastName) LIKE ?
            GROUP BY 
                c.id
            ORDER BY 
                ${orderBy || "c.date DESC"};
        `,
      [
        `%${title || ""}%`,
        `%${speciality || ""}%`,
        `%${severity || ""}%`,
        `%${patient || ""}%`,
      ]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar las consultas" });
  }
};

// Funcion para obtener todas las consultas
export const getConsultations = async (req, res) => {
  const { title, speciality, severity, patient, orderBy } = req.query;

  const [rows] = await Db.query(
    `
            SELECT 
                c.title,
                CONCAT(d.firstName, ' ', d.lastName) AS doctor,
                s.name AS speciality,
                c.severity,
                c.date,
                CONCAT(p.firstName, ' ', p.lastName) AS patient,
                COUNT(r.id) AS numberOfResponses
            FROM 
                consultations c
            JOIN 
                users d ON c.doctorId = d.id
            JOIN 
                users p ON c.patientId = p.id
            JOIN 
                specialities s ON c.specialityId = s.id
            LEFT JOIN 
                responses r ON c.id = r.consultationId
            WHERE 
                c.title LIKE ? AND
                s.name LIKE ? AND
                c.severity LIKE ? AND
                CONCAT(p.firstName, ' ', p.lastName) LIKE ?
            GROUP BY 
                c.id
            ORDER BY 
                ${orderBy || "c.date DESC"};
        `,
    [
      `%${title || ""}%`,
      `%${speciality || ""}%`,
      `%${severity || ""}%`,
      `%${patient || ""}%`,
    ]
  );

  res.status(200).json(rows);
};
