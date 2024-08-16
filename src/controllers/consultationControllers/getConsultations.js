import { getConsultations } from "../../database/consultation.js";

export const getConsultationController = async (req, res) => {
  const consultations = await getConsultations();
  res.status(200).json(consultations);
};
