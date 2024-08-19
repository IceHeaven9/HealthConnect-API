import { Consultation } from "../../models/Consultation.js";

export const respondToConsultationController = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    // Check if the user is authorized to respond to the consultation
    // You can add your own authorization logic here
    if (
      consultation.patientId !== req.user.id &&
      consultation.doctorId !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    consultation.response = response;
    await consultation.save();

    res.status(200).json({ message: "Consultation responded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};