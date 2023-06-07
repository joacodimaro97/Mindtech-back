import "dotenv/config.js";
import "../../config/database.js";

import { users } from "./users.js";
import User from "../User.js";
import { products } from "./products.js";
import Product from "../Product.js";

import { checkAndInsertData } from "../../utils.js";

async function loadData() {
  try {
    await checkAndInsertData(User, users, "Users");
    await checkAndInsertData(Product, products, "Products");
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "=> An error occurred while uploading data"
    );
    console.error(error);
  }
}

loadData();
