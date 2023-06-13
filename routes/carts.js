import { Router } from "express";
let router = Router();

import { readAll, readOne } from "../controllers/carts/read.js";
import {
  createCartOnLogin,
  clearCart,
  addProduct,
  delProduct,
} from "../controllers/carts/additional.js";

router.get("/all", readAll);
router.get("/one", readOne);
router.post("/createCartOnLogin", createCartOnLogin);
router.put("/clearCart", clearCart);
router.post("/addProduct", addProduct);
router.delete("/delProduct", delProduct);

export default router;
