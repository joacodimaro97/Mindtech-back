import { Router } from "express";
let router = Router();

import read from "../controllers/products/read.js";

router.get("/", read);

export default router;
