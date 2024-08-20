import { getConsultations } from "../../database/consultation.js";
import { generateErrors } from "../../utils/generateErrors.js";

export const getConsultationController = async (req, res) => {
  const userId = req.currentUser.id;
  if (!userId) {
    throw generateErrors(401, "UNAUTHORIZED", "User not authenticated");
  }
  const consultations = await getConsultations();
  res.status(200).json(consultations);
};
