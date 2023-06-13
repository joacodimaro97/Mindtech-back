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

router.get("/all", readAll);
router.get("/one", readOne);
router.post("/create", create)
//es get apra crear no???
router.delete("/delete", deleteProducts)

router.get("/paginate", paginateProducts);
router.get("/searchByName", searchByName);
router.get("/searchByCategory", searchByCategory);
router.get("/searchByBrand", searchByBrand);

export default router;
