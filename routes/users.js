import { Router } from "express";
let router = Router();

import read from "../controllers/users/read.js";
import {
  register,
  sendVerificationEmail,
  verifyEmail,
} from "../controllers/users/register.js";
import login from "../controllers/users/login.js";
import logout from "../controllers/users/logout.js";

router.get("/", read);

router.post("/register", register);
router.post("/send-verification-email/:email", sendVerificationEmail);
router.get("/verify-mail", verifyEmail);

router.post("/login", login);

router.post("/logout/:email", logout);

export default router;
