import { Router } from "express";
let router = Router();

import read from "../controllers/brands/read.js";

router.get("/", read);

export default router;
