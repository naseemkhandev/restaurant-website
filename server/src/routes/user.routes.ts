import express from "express";
import { getAuthUser, updateUserProfile } from "../controllers/user.controller";
import verifyToken from "../middlewares/verifyToken.middleware";
const router = express.Router();

router.get("/auth-user", verifyToken, getAuthUser);
router.patch("/update-profile", verifyToken, updateUserProfile);

export default router;
