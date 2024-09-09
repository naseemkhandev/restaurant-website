import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware";
import { addMenu } from "../controllers/menu.controller";
const router = express.Router();

router.post("/", verifyToken, addMenu);

export default router;
