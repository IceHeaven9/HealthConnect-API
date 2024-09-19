import { Db } from "../../structure/db.js"

export const getUserById = async (id) => {

  const [user] = await Db.query(
    "SELECT CONCAT(firstName, ' ', lastName) AS fullName, email, biography, experience FROM users WHERE id = ?",
    [id]
  )
return user;
}
