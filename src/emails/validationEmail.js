import { transport } from './email.js';
import { FRONTEND_HOST } from '../../constants.js';

// Enviamos un correo electrónico con el enlace para validar el correo electrónico

export function sendValidationEmail({ firstName, email, validationCode }) {
	transport.sendMail({
		from: 'HealthConnect <cristhians7x@gmail.com>',
		to: `${firstName} <${email}>`,
		subject: 'Bienvenido a HealthConnect - Valida tu email',
		html: `
                <html>
          <head>
          <style>
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
          </style>
          </head>
          <body>
            <h1>Bienvenido a HealthConnect</h1>
            <p>
              Hola ${firstName}, bienvenido a HealthConnect. Nos alegra tenerte a bordo. Antes de que puedas comenzar a usar la aplicación, necesitas validar tu correo electrónico.
            </p>
            <p>Código de validación: ${validationCode}</p>
            <p>
              <a href="${FRONTEND_HOST}/validate-email">
                Click aqui para validar tu email
              </a>
            </p>
          </body>
        </html>
        `,
	});
	console.log(`Email de validación enviado a ${email}`);
}
