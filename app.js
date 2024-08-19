import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import {
	notFoundController,
	errorController,
} from "./src/controllers/errors/index.js";

import { API_HOST } from "./constants.js";
import { infoLog } from "./src/utils/logger.js";
import { consultationRoutes } from "./src/routes/consultation.js";
import { authRoutes } from "./src/routes/auth.js";
import { specilitiesRoutes } from "./src/routes/specialities.js";
import { usersRoutes } from "./src/routes/users.js";
import { responsesRoutes } from "./src/routes/responses.js";

const app = express();

// Middlewares

// Middleware para parsear el body de las peticiones
app.use(express.json());

// Middleware cors
app.use(cors());

// Middleware para morgan
app.use(morgan("dev"));

// Middleware para subir ficheros
app.use(fileUpload());

// Establecemos el directorio público
app.use("/public", express.static("./public"));

// Establecemos el directorio de los archivos cargados
app.use("/uploads", express.static("./uploads"));

// Rutas
app.use(authRoutes);

app.use(consultationRoutes);

app.use(responsesRoutes);

app.use(specilitiesRoutes);

app.use(usersRoutes);

// Middleware de Ruta no encontrada
app.use(notFoundController);

// Middleware gestión de errores
app.use(errorController);

app.listen(API_HOST || 3000, () => {
	infoLog(`Server is running on port ${API_HOST}`);
});
