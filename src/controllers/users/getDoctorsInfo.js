// CONTROLADOR PARA OBTENER LA INFORMACION DE UN MÉDICO

import { findUserById } from "../../database/users.js";

export const getDoctorById = async (req, res) => {    
  const { id } = req.params;            //Se extrae el ID del médico desde la petición
  if (!id) {
    return res.status(404).json({ error: 'Doctor not found' });
  } const doctor = await findUserById(id);
    if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }
  res.status(200).json(doctor);  //Se devuelve la información del médico
};

