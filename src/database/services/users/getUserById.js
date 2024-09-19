import { Db } from "../../structure/db.js"

export const getUserById = async (id) => {

  const [user] = await Db.query(
    "SELECT firstName, lastName, userName, email, biography, experience FROM users WHERE id = ?",
    [id]
  )
return user;
}
