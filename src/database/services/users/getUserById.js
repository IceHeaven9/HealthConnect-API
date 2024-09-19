import { Db } from "../../structure/db.js"

export const getUserById = async (id) => {

const [user] = await Db.query(
  "SELECT * FROM users WHERE id =?",
  [id]
)
return user;
}
