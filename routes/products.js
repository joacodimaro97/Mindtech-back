import { Router } from "express";
let router = Router();

import { readAll, readOne } from "../controllers/products/read.js";

router.get("/all", readAll);
router.get("/:one", readOne);

export default router;
