import express from "express";
import {
  getRestaurantOrders,
  updateOrderStatus,
} from "../controllers/order.controller";
import verifyToken from "../middlewares/verifyToken.middleware";
const router = express.Router();

router.post("/", verifyToken, getRestaurantOrders);
router.patch("/:id", verifyToken, updateOrderStatus);

export default router;
