# API DE SALUDCONNECT

## Descripción

¡Bienvenido a SaludConnect!

Imagina tener acceso a un equipo completo de especialistas médicos a un solo clic de distancia, desde la comodidad de tu hogar. Esta plataforma no es solo una herramienta digital; es un puente entre pacientes y médicos, diseñado para transformar la manera en que interactuamos con la atención médica.

SaludConnect nace con el propósito de brindar respuestas rápidas y profesionales a tus inquietudes de salud. Ya no es necesario esperar días o semanas para consultar con un especialista. Aquí, los pacientes pueden exponer sus síntomas, adjuntar imágenes o documentos, y recibir la orientación médica necesaria de forma ágil y segura.

Para los profesionales de la salud, esta plataforma ofrece una oportunidad única de extender su alcance, permitiéndoles ofrecer su experiencia y conocimientos a quienes más lo necesitan, sin importar la distancia.

Con funcionalidades diseñadas para maximizar la eficiencia y la seguridad, SaludConnect es más que una simple aplicación; es un espacio donde la tecnología y la medicina se unen para ofrecer un servicio de salud accesible y de alta calidad.

## **Características Principales**

### **Para Usuarios No Registrados**

- **Exploración Rápida**: Accede a la landing page con un listado completo de consultas médicas disponibles, permitiendo a cualquier usuario explorar las consultas antes de registrarse.

- **Búsqueda y Filtros Avanzados**:
  - **Por Palabra Clave**: Encuentra consultas relevantes mediante la búsqueda en títulos, descripciones, o nombres de médicos.
  - **Por Especialidad**: Filtra consultas por especialidades médicas específicas como Traumatología, Pediatría, entre otras.
  - **Por Nivel de Gravedad**: Prioriza consultas según su urgencia (alta, media, baja).
- **Ordenación Inteligente**: Organiza las consultas por diferentes criterios como fecha de publicación, especialidad médica, o nivel de gravedad.
- **Registro y Autenticación Sencillos**:
  - Regístrate fácilmente con un correo electrónico, elige un nombre de usuario y establece una contraseña segura.
  - Selecciona tu tipo de usuario (paciente o médico) para personalizar tu experiencia.
  - Recibe un correo electrónico de validación para asegurar la seguridad de tu cuenta.
- **Recuperación de Contraseña**: Si olvidas tu contraseña, recupérala rápidamente mediante un enlace seguro enviado a tu correo electrónico.

### **Para Pacientes Registrados**

- **Acceso Completo a la Plataforma**: Disfruta de todas las funciones disponibles para usuarios no registrados, con el añadido de funcionalidades exclusivas para pacientes.

- **Consulta en Detalle**: Accede a la ficha completa de cada consulta, con todas las respuestas de los médicos y detalles adicionales proporcionados por otros pacientes.
- **Gestión Integral del Perfil**:
  - Personaliza tu perfil con tu nombre, apellidos, biografía, y un avatar.
  - Modifica tu dirección de correo electrónico, nombre de usuario, o contraseña cuando lo desees.
- **Creación de Consultas Médicas**:
  - **Título y Descripción**: Redacta una consulta médica detallada que incluya síntomas y antecedentes relevantes.
  - **Adjuntar Archivos**: Sube imágenes o documentos para proporcionar información adicional a los médicos.
  - **Selección de Médico o Especialidad**: Escoge a un médico específico o permite que la plataforma asigne un especialista basado en la consulta.
  - **Prioridad de Consulta**: Indica el nivel de gravedad para asegurar la atención adecuada.
- **Historial de Consultas**: Accede a un registro completo de todas las consultas que has realizado, incluyendo respuestas y resoluciones.
- **Interacción Dinámica con Consultas**:
  - Elimina una consulta si no ha recibido respuestas.
  - Califica la calidad de las respuestas recibidas por parte de los médicos (1-5 estrellas).
- **Exploración de Profesionales**:
  - Accede a un listado de médicos con su calificación promedio basada en las respuestas que han proporcionado.
  - Consulta la ficha detallada de cada médico, que incluye su especialidad, años de experiencia, y biografía.

### **Para Médicos Registrados**

- **Exploración de Consultas**: Visualiza el listado completo de consultas disponibles, filtrado y ordenado según tus preferencias.
- **Gestión Profesional del Perfil**:
  - Actualiza tu perfil con información relevante como especialidad médica, años de experiencia, biografía, y avatar.
  - Consulta y mantén un historial de tu rating promedio basado en las valoraciones de los pacientes.
- **Atención a Consultas**:
  - Responde a consultas asignadas dentro de tu especialidad con respuestas detalladas y profesionales.
  - Elimina respuestas propias si aún no han sido valoradas, asegurando la calidad de tu trabajo.
- **Historial y Seguimiento**:
  - Revisa un historial detallado de todas las consultas a las que has respondido o que te han sido asignadas.
- **Calificación Transparente**:
  - Consulta las valoraciones que recibes de los pacientes para cada respuesta proporcionada (1-5 estrellas).

## Tecnologías Utilizadas

- Node.js
- Express
- MySql2
- JWT para autenticación
- Sharp

- Nodemailer
- Express Fileupload
- Joi
- Bcrypt
- Cors

## Requisitos Previos

- Node.js
- NPM o similar

- Mysql Server
- Postman o similar

## Funcionalidades

1. **Autenticación y Gestión de Usuarios**: Registro, inicio de sesión, y recuperación de contraseñas de usuarios utilizando contraseñas cifradas y tokens JWT para autenticación segura.

2. **Interacción con la Base de Datos**: Manejo de una base de datos MySQL para almacenar y recuperar información sobre usuarios, consultas médicas, respuestas, y otros datos necesarios.
3. **Gestión de Consultas Médicas**: Los pacientes pueden crear, ver, y administrar sus consultas; mientras que los médicos pueden responder a ellas, utilizando validación de datos para garantizar entradas correctas.
4. **Carga y Manipulación de Archivos**: Los usuarios pueden subir imágenes y documentos adjuntos a sus consultas, que pueden ser procesados y optimizados.
5. **Notificaciones por Correo Electrónico**: Envío de correos electrónicos para validación de cuentas y recuperación de contraseñas.

Estas funcionalidades permiten crear una plataforma robusta y segura para la interacción entre pacientes y médicos en línea.

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
    	"nodemon": "^3.1.4",
    	"sharp": "^0.33.5"
    },

    "devDependencies": {
    	"@faker-js/faker": "^8.4.1"
    }

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
        FRONTEND_HOST=
        JWT_SECRET="EXAMPLE"


        DB_HOST=127.0.0.1
        DB_USER=dev
        DB_PASS=password
        DB_NAME=citas_medicas

        EMAIL_HOST=smtp.host
        EMAIL_PORT=smtp.port
        EMAIL_USER=smtp.user.account
        EMAIL_PASS=smtp.user.pass

## Base de datos

1.  Crear la base de datos y las tablas:

        npm run initDb

2.  Añade las semillas de datos:

        npm run seedDb

## Uso

Una vez que el servidor esté en funcionamiento, puedes interactuar con la API utilizando herramientas como Postman.

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

### Consultas

- **Para crear una consulta**: `POST /consultations`
- **Para obtener todas las consultas**: `GET /consultations`
- **Para obtener los datos de una consulta**: `GET /consultations/:id/details`

### Respuestas

- **Para responder a una consulta**: `POST /consultations/:id/response`

### Especialidades

- **Para devolver todas las especialidades**: `GET /specialities`

### Usuarios

- **Para obtener la lista de médicos**: `GET /doctors`

- **Para subir un avatar**: `POST /avatar`

- **Para cambiar la contraseña**: `POST /api/change-password`

## Licencia

© 2024 HACK A BOSS. Todos los derechechos reservados.
