import { faker } from "@faker-js/faker";
import { Db } from "../structure/db.js";
import { hashPassword } from "../../utils/hashPassword.js";

// Insertar datos falsos a la tabla specialities

const specialities = [
  "Cardiología",
  "Dermatología",
  "Endocrinología",
  "Gastroenterología",
  "Geriatría",
  "Ginecología",
  "Hematología",
  "Infectología",
  "Medicina interna",
  "Nefrología",
  "Neumología",
  "Neurología",
  "Oftalmología",
  "Oncología",
  "Pediatría",
  "Psiquiatría",
  "Reumatología",
  "Traumatología",
  "Urología",
];

for (const specialty of specialities) {
  await Db.query("INSERT INTO specialities (name) VALUES (:specialty)", {
    specialty,
  });
}

// Insertar datos falsos a la tabla users

const getSpecialities = await Db.query("SELECT id FROM specialities");
const specialityIds = getSpecialities.map((speciality) => speciality.id);

const demoUserCount = 50;
const globalPassword = "pass1234";

async function createDemoUsers() {
  for (let i = 0; i < demoUserCount; i++) {
    const userType = faker.helpers.arrayElement(["paciente", "doctor"]);
    const specialityId =
      userType === "doctor" ? faker.helpers.arrayElement(specialityIds) : null;
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

await createDemoUsers();

await Db.end();
// // Insertar datos falsos a la tabla consultations

// const getDoctors = await Db.query(
//   "SELECT * FROM users WHERE userType = 'doctor'"
// );

// const getPatients = await Db.query(
//   "SELECT * FROM users WHERE userType = 'paciente'"
// );

// const getSpecialitiesIds = await Db.query("SELECT id FROM specialities");
// console.log(getSpecialitiesIds);

// async function createConsultations() {
//   for (let i = 0; i < 10; i++) {
//     const doctor = faker.helpers.arrayElement(getDoctors);
//     const patient = faker.helpers.arrayElement(getPatients);
//     const speciality = faker.helpers.arrayElement(getSpecialitiesIds);

//     if (!doctor || !patient || !speciality) {
//       console.error("Error: Doctor, paciente o especialidad es nulo.");
//       continue; // Salta esta iteración si alguno es nulo
//     }

//     const consultation = {
//       title: faker.lorem.words(),
//       description: faker.lorem.paragraph(),
//       severity: faker.helpers.arrayElement(["high", "medium", "low"]),
//       doctorId: doctor.id,
//       patientId: patient.id,
//       specialityId: speciality.id,
//       status: faker.helpers.arrayElement(["pending", "completed"]),
//     };

//     await Db.query(
//       "INSERT INTO consultations (title, description, severity, specialityId, status) VALUES (:title, :description, :severity, :specialityId, :status)",
//       consultation
//     );
//   }
// }

// await createConsultations();
