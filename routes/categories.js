import { Router } from "express";
let router = Router();

import read from "../controllers/categories/read.js";

router.get("/", read);

export default router;
