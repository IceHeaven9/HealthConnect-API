import Joi from "joi";
import { validate } from "./validate.js";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export function parseLoginPayload(payload) {
  const result = validate(loginSchema, payload);
  return result.value;
}
