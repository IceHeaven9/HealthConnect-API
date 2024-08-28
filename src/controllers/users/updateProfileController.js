// Controlador para actualizar el perfil del usuario

import { updateUserById } from "../../database/users";

export const updateProfileController = async (req, res) => {
    const { id } = req.currentUser;
    const {firstName, lastName, userName, biography, experience} = req.body;           
  if (!id) {
    return res.status(404).json({ error: 'Id not found' });
  } const user = await findUserById(id);
    if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const updateUser = await updateUserById(id, firstName, lastName, userName, biography, experience);
  res.status(200).json(updateUser);  
};
