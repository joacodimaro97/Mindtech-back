import User from "../User.js";
import { users } from "./users.js";

let newUsers = async(users) => await User.insertMany(users)

let data = async () => {
  await newUsers(users)
  console.log('done!')
}

data()
