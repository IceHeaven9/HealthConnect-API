import { getConsultationById } from "../../database/consultation.js";
import { setResponse } from "../../database/responses.js";
import { parseResponsePayload } from "../../validations/responses.js";

export const createResponsesController = async (req, res) => {
  const { id } = req.params;
  const { content, rating } = parseResponsePayload(req.body);
  const userId = req.currentUser.id;
  const userType = req.currentUser.userType;

  const consultation = await getConsultationById(id);

  if (!consultation) {
    return res.status(404).json({ message: "Consulta no encontrada" });
  }

  if (
    (userType === "paciente" && consultation.patientId !== userId) ||
    (userType === "doctor" &&
      consultation.doctorId !== userId &&
      consultation.specialityId !== req.currentUser.specialityId)
  ) {
    return res.status(403).json({ message: "No autorizado" });
  }

  await setResponse(content, id, userId, rating);

  res.status(201).json({ message: "Respuesta creada exitosamente" });
};
