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

// Middleware de Ruta no encontrada
app.use(notFoundController);

// Middleware gestión de errores
app.use(errorController);

app.listen(API_HOST, () => {
  infoLog("Server is running on port 3000");
});
