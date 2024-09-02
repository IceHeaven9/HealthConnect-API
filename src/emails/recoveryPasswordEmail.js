import { transport } from './email.js';
import { FRONTEND_HOST } from '../../constants.js';

// Enviamos un correo electrónico con el enlace para restablecer la contraseña

export async function sendResetPasswordEmail(email, recoveryPasswordCode) {
	transport.sendMail({
		from: 'SaludConnect <cristhians7x@gmail.com>',
		to: `<${email}>`,
		subject: 'Recuperación de contraseña',
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
            <h1>Bienvenido a SaludConnect</h1>
            <p>
              Has solicitado la recuperación de tu contraseña. Haz clic en el siguiente enlace para restablecerla:
            </p>
            <p>
            Código de recuperación: <strong>${recoveryPasswordCode}</strong
            </p>
            <p>
              <a href=${FRONTEND_HOST}/reset}>
                Click aqui para restablecer tu contraseña
              </a>
            </p>
            <p>
              Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:
            </p>
            
          </body>
        </html>
      `,
	});
}
