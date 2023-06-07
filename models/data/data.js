import "dotenv/config.js";
import "../../config/database.js";

import { users } from "./users.js";
import User from "../User.js";
import { products } from "./products.js";
import Product from "../Product.js";
import { categories } from "./categories.js";
import Category from "../Category.js";
import { brands } from "./brands.js";
import Brand from "../Brand.js";

import { checkAndInsertData } from "../../utils.js";

async function loadData() {
  try {
    await checkAndInsertData(User, users, "Users");
    await checkAndInsertData(Category, categories, "Categories");
    await checkAndInsertData(Brand, brands, "Brands");

    for (let product of products) {
      let category = await Category.findOne({ name: product.category });
      if (category) {
        product.category = category._id;
      }
      let brand = await Brand.findOne({ name: product.brand });
      if (brand) {
        product.brand = brand._id;
      }
    }

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
