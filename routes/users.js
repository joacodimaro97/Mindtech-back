import { Router } from "express";
let router = Router();

import read from "../controllers/users.js";

router.get("/", read);

export default router;
