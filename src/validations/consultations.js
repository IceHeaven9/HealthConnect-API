import Joi from "joi";
import { validate } from "./validate.js";

// Validaciones para la creación de una consulta
const consultationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  specialityid: Joi.number().required(),
  doctorid: Joi.number().required(),
  severity: Joi.string().required(),
  date: Joi.date(),
});

export const parseConsultationPayload = (payload) => {
  const result = validate(consultationSchema, payload);
  return result.value;
};

// Validaciones para la
