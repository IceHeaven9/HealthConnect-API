# API DE CONSULTAS MEDICAS

## Descripción

Esta API permite gestionar consultas médicas, incluyendo la creación, actualización, eliminación y consulta de citas médicas. Está diseñada para ser utilizada por clínicas y consultorios médicos para facilitar la administración de sus citas.

## Características

- Crear nuevas citas médicas.
- Consultar citas existentes.
- Actualizar información de citas.
- Eliminar citas.
- Gestión de pacientes y médicos.
- Especialidades Medicas.
- Respuestas del Medico a la consulta.
-

## Tecnologías Utilizadas

- Node.js
- Express
- MySql2
- JWT para autenticación
- Nodemailer
- Express Fileupload
- Joi
- bcrypt
- cors

## Requisitos Previos

- Node.js instalado
- Mysql Server
- Postman

## Funcionalidades

- **Autenticación**: Autenticación segura mediante JSON Web Tokens (JWT).
- **Subida de Imágenes**: Soporte para la subida de imágenes de perfil y publicaciones.
- **Optimización de Imágenes**: Redimensionamiento y optimización de imágenes utilizando Sharp.
- **Validación de Datos**: Validación de datos de entrada utilizando la biblioteca Joi.
- **Envío de Correos Electrónicos**: Envío de correos electrónicos para verificación de cuenta y otras notificaciones mediante Nodemailer.
- **Registro de Correos Electrónicos**: Registro y verificación de usuarios por correo electrónico.
- **Log de Solicitudes**: Registro de solicitudes HTTP mediante Morgan.
- **Manejo de Errores**: Manejo avanzado de errores y respuestas estándar.

## Dependencias

    "dependencies": {
    	"bcrypt": "^5.1.1",
    	"chalk": "^5.3.0",
    	"cors": "^2.8.5",
    	"crypto": "^1.0.1",
    	"dotenv": "^16.4.5",
    	"express": "^4.19.2",
    	"express-fileupload": "^1.5.1",
    	"joi": "^17.13.3",
    	"jsonwebtoken": "^9.0.2",
    	"morgan": "^1.10.0",
    	"mysql2": "^3.11.0",
    	"nodemailer": "^6.9.14",
    	"nodemon": "^3.1.4"},

    "devDependencies": {
    	"@faker-js/faker": "^8.4.1"}

## Instalación

1. Clonar el repositorio:

   git clone https://github.com/DenisseBabio/PFB-Citas-M-dicas.git

2. Navegar al directorio del proyecto:

   cd PFB-Citas-M-dicas

3. Instalar dependencias:

   npm install

## Configuración

1.  Configurar las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto y añade las variables necesarias, por ejemplo:

             PORT=3000
             DB_URI=mongodb://localhost:27017/consultas_medicas
             JWT_SECRET=your_secret_key

2.  Iniciar servidor:

             npm run dev

## Base de datos

1.  Crear la base de datos y las tablas:

              npm run initDb

2.  Añade las semillas de datos:

              npm run seedDb

## Uso

Una vez que el servidor esté en funcionamiento, puedes interactuar con la API utilizando herramientas como Postman o cURL. A continuación se presentan algunos ejemplos de endpoints:

1.  Iniciar el servidor:

        npm run dev

2.  La API estará disponible en `http://localhost:3000`.

## Endpoints

### Autenticación

- **Registro de Usuario**: `POST /api/register`
- **Inicio de Sesión**: `POST /api/login`
- **Verificación de Correo Electrónico**: `POST /api/validate-email`
- **Recuperación de contraseña**: `POST /api/recover-password`
- **Para restablecer contraseña**: `POST /api/reset/:token`
- **Para cambiar la contraseña**: `POST /api/change-password`

### Consultas

- **Para crear una consulta**: `POST /consultations`
- **Para obtener todas las consultas**: `GET /consultations`
- **Para obtener los datos de una consulta**: `GET /consultations/:id/details`

### Respuestas

- **Para responder a una consulta**: `POST /consultations/:id/response`

### Especialidades

- **Para devolver todas las especialidades**: `GET /consultations`

### Usuarios

- **Para obtener la lista de médicos**: `GET /doctors`

## Licencia

© 2024 Hackaboss. Todos los derechechos reservados.
