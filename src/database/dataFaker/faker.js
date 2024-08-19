import { fa, faker } from "@faker-js/faker";
import { Db } from "../structure/db.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { infoLog, succesLog } from "../../utils/logger.js";

// Insertar datos falsos a la tabla specialities

const specialities = [
  { id: 1, name: "Cardiología" },
  { id: 2, name: "Dermatología" },
  { id: 3, name: "Endocrinología" },
  { id: 4, name: "Gastroenterología" },
  { id: 5, name: "Geriatría" },
  { id: 6, name: "Ginecología" },
  { id: 7, name: "Hematología" },
  { id: 8, name: "Infectología" },
  { id: 9, name: "Medicina interna" },
  { id: 10, name: "Nefrología" },
  { id: 11, name: "Neumología" },
  { id: 12, name: "Neurología" },
  { id: 13, name: "Oftalmología" },
  { id: 14, name: "Oncología" },
  { id: 15, name: "Pediatría" },
  { id: 16, name: "Psiquiatría" },
  { id: 17, name: "Reumatología" },
  { id: 18, name: "Traumatología" },
  { id: 19, name: "Urología" },
  { id: 20, name: "Otorrinolaringología" },
];

async function createSpecialities() {
  for (let i = 0; i < specialities.length; i++) {
    await Db.query(
      "INSERT INTO specialities (name) VALUES (:name)",
      specialities[i]
    );
  }
}

infoLog("Insertando datos de specialities...");

await createSpecialities();

succesLog("Datos specilities insertados correctamente");

// Insertar datos falsos a la tabla users

const [getSpecialities] = await Db.query("SELECT id FROM specialities");
const specialityIds = getSpecialities.map((speciality) => speciality.id);

const demoUserCount = 50;
const globalPassword = "pass1234";

async function createDemoUsers() {
  for (let i = 0; i < demoUserCount; i++) {
    const userType = faker.helpers.arrayElement(["paciente", "doctor"]);
    const specialityId =
      specialityIds[Math.floor(Math.random() * specialityIds.length)];
    const username = faker.internet.userName();
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: await hashPassword(globalPassword),
      userType: userType,
      userName: username,
      biography: userType === "doctor" ? faker.lorem.paragraph() : null,
      avatar: `https://i.pravatar.cc/150?u=${username}`,
      specialityId: specialityId,
    };

    await Db.query(
      "INSERT INTO users (firstName, lastName, email, password, userType, userName, biography, avatar, specialityId) VALUES (:firstName, :lastName, :email, :password, :userType, :userName, :biography, :avatar, :specialityId)",
      user
    );
  }
}

infoLog("Insertando datos de users...");

await createDemoUsers();

succesLog("Datos users insertados correctamente");

// Insertar datos falsos a la tabla consultations

const getDoctors = await Db.query(
  "SELECT id FROM users WHERE userType = 'doctor'"
);
const getDoctorsIds = getDoctors[0].map((doctor) => doctor.id);
const getPatients = await Db.query(
  "SELECT id FROM users WHERE userType = 'paciente'"
);
const getPatientsIds = getPatients[0].map((patient) => patient.id);

async function createConsultations() {
  for (let i = 0; i < 20; i++) {
    const consultations = {
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      severity: faker.helpers.arrayElement(["high", "medium", "low"]),
      doctorId: faker.helpers.arrayElement(getDoctorsIds),
      patientId: faker.helpers.arrayElement(getPatientsIds),
      specialityId: faker.helpers.arrayElement(specialityIds),
      status: faker.helpers.arrayElement(["pending", "completed"]),
    };

    await Db.query(
      "INSERT INTO consultations (title, description, severity, doctorId, patientId, specialityId, status) VALUES (:title, :description, :severity, :doctorId, :patientId, :specialityId, :status)",
      consultations
    );
  }
}

infoLog("Insertando datos de consultations...");

await createConsultations();

succesLog("Datos consultations insertados correctamente");

// Insertar datos falsos a la tabla responses

const getConsultations = await Db.query("SELECT id FROM consultations");
const getConsultationsIds = getConsultations[0].map(
  (consultation) => consultation.id
);

async function createResponses() {
  for (let i = 0; i < 20; i++) {
    const responses = {
      content: faker.lorem.paragraph(),
      consultationId: faker.helpers.arrayElement(getConsultationsIds),
      doctorId: faker.helpers.arrayElement(getDoctorsIds),
      rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    };

    await Db.query(
      "INSERT INTO responses (content, consultationId, doctorId, rating) VALUES (:content, :consultationId, :doctorId, :rating)",
      responses
    );
  }
}

infoLog("Insertando datos de responses...");

await createResponses();

succesLog("Datos responses insertados correctamente");

// Insertar datos falsos a la tabla ratings

async function createRatings() {
  for (let i = 0; i < 20; i++) {
    const ratings = {
      userId: faker.helpers.arrayElement(getPatientsIds),
      consultationId: faker.helpers.arrayElement(getConsultationsIds),
      rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    };

    await Db.query(
      "INSERT INTO ratings (userId, consultationId, rating) VALUES (:userId, :consultationId, :rating)",
      ratings
    );
  }
}

infoLog("Insertando datos de ratings...");

await createRatings();

succesLog("Datos ratings insertados correctamente");
await Db.end();
