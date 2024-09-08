import express from "express";
import { getAuthUser } from "../controllers/user.controller";
import verifyToken from "../middlewares/verifyToken.middleware";
const router = express.Router();

router.get("/auth-user", verifyToken, getAuthUser);

export default router;
