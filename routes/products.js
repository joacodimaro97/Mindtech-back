import { Router } from "express";
let router = Router();

import { readAll, readOne } from "../controllers/products/read.js";
import {
  paginateProducts,
  searchByName,
  searchByCategory,
  searchByBrand,
} from "../controllers/products/additional.js";
import {deleteProducts} from '../controllers/products/delete.js'
import create from '../controllers/products/create.js'
import updateProduct from "../controllers/products/update.js";
import { rating } from "../controllers/products/additional.js";
import validator from "../middlewares/validator.js";
import productExists from "../middlewares/productExists.js";
import verifiedRole from '../middlewares/admin.js'
import productSchema from "../schemas/product.js";


router.get("/all", readAll);
router.get("/one", readOne);
router.post("/create", verifiedRole ,productExists ,validator(productSchema) ,create)
router.put("/update/:id", updateProduct)
router.post("/rating", rating)
router.delete("/delete", deleteProducts)

router.get("/paginate", paginateProducts);
router.get("/searchByName", searchByName);
router.get("/searchByCategory", searchByCategory);
router.get("/searchByBrand", searchByBrand);

export default router;
