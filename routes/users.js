import { Router } from "express";
let router = Router();

import read from "../controllers/users/read.js";
import {
  register,
  sendVerificationEmail,
  verifyEmail,
} from "../controllers/users/register.js";

router.get("/", read);

router.post("/register", register);
router.post("/send-verification-email/:email", sendVerificationEmail);
router.get("/verify-mail", verifyEmail);

export default router;
