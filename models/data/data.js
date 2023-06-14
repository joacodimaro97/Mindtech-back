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

async function loadData() {
  try {
    await User.insertMany(users);
    console.log(`\x1b[32m%s\x1b[0m`, `=> Users loaded`);

    await Category.insertMany(categories);
    console.log(`\x1b[32m%s\x1b[0m`, `=> Categories loaded`);

    await Brand.insertMany(brands);
    console.log(`\x1b[32m%s\x1b[0m`, `=> Brands loaded`);

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

    await Product.insertMany(products);
    console.log(`\x1b[32m%s\x1b[0m`, `=> Products loaded`);
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "=> An error occurred while uploading data"
    );
    console.error(error);
  }
}

loadData();
