import express from "express";
import {
  register,
  login,
  logout,
  verifyEmail,
} from "../controllers/auth.controller";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// verify-email
router.get("/verify-email", verifyEmail);

export default router;
