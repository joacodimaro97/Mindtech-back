import "dotenv/config.js";
import "../../config/database.js";

import { users } from "./users.js";
import User from "../User.js";

let newUser = async (users) => await User.insertMany(users);

let data = async () => {
  await newUser(users);
  console.log("✅ Database uploaded successfully");
};

data();
