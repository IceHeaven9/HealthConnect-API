import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constants.js";
import { generateErrors } from "../utils/generateErrors.js";

// Middleware para analizar el token JWT y asignar el usuario actual a la solicitud
async function parseCurrentUser(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      req.currentUser = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return next({
          ...err,
          name: "TOKEN_EXPIRED",
          status: 401,
        });
      }
    }
  }
  next();
}

// Middleware para proteger rutas que requieren autenticación
function authGuard(req, res, next) {
  if (!req.currentUser) {
    throw generateErrors(
      401,
      "UNAUTHORIZED",
      "You must be logged in to access this resource"
    );
  }

  next();
}

// Función que une ambos middlewares en uno solo para simplificar el uso
export function authMiddleware(req, res, next) {
  parseCurrentUser(req, res, (err) => {
    if (err) {
      return next(err);
    }
    authGuard(req, res, next);
  });
}
