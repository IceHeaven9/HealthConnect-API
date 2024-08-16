import { getDoctors } from "../../database/users.js";

export const doctorsController = async (req, res) => {
  const doctors = await getDoctors();
  res.status(200).json(doctors);
};
