import express from "express";
import {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
} from "../controllers/auth.controller";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

export default router;
