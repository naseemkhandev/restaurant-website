import express from "express";
import { createCheckoutSession } from "../controllers/order.controller";
import verifyToken from "../middlewares/verifyToken.middleware";
const router = express.Router();

router.post("/", verifyToken, createCheckoutSession);

export default router;
