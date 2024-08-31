import { getConsultationById } from "../../database/consultation.js";

export const deleteConsultationFileController = async (req, res) => {
  const user = req.currentUser;
  const { id,fileName } = req.params;
  const consultation = await getConsultationById(id);

}