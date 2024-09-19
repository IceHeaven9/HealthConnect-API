import { getUserById } from "../../database/services/users/getUserById.js";
import { generateErrors } from "../../utils/generateErrors.js";

export const getUserProfileController = async (req, res) => {
const userId = req.currentUser.id;


const user = await getUserById(userId);

if (!user) {
  throw generateErrors (404,"BAD REQUEST", "User not found");
}

res.status(200).json(user);
}