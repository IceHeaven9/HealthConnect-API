import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import {
	notFoundController,
	errorController,
} from './src/controllers/errors/index.js';

import { PORT } from './constants.js';
import { infoLog } from './src/utils/logger.js';
import { consultationRoutes } from './src/routes/consultation.js';
import { authRoutes } from './src/routes/auth.js';
import { specilitiesRoutes } from './src/routes/specialities.js';
import { usersRoutes } from './src/routes/users.js';
import { responsesRoutes } from './src/routes/responses.js';
<<<<<<< HEAD
=======
import {finishedConsultationsRoutes} from './src/routes/consultation.js';
import {upcomingConsultationsRoutes} from './routes/upcomingConsultations.js';

>>>>>>> ce7edb1 (Endpoint finished and upcoming Consultations)
const app = express();

// Middlewares
// Middleware para parsear el body de las peticiones

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware cors

app.use(cors());

// Middleware para morgan

app.use(morgan('dev'));

// Middleware para subir ficheros

app.use(fileUpload());

// Establecemos el directorio público

app.use('/public', express.static('./public'));

// Establecemos el directorio de los archivos cargados

app.use('/uploads', express.static('./uploads'));

// Rutas

app.use(authRoutes);

app.use(consultationRoutes);

app.use(responsesRoutes);

app.use(specilitiesRoutes);

app.use(usersRoutes);

app.use(finishedConsultationsRoutes);

app.use(upcomingConsultationsRoutes);

// Middleware de Ruta no encontrada

app.use(notFoundController);

// Middleware gestión de errores

app.use(errorController);

// Inicializamos el servidor
app.listen(PORT || 3000, () => {
	infoLog(`Server is running on port ${PORT}`);
});
