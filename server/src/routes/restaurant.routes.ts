import express from "express";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantById,
  searchRestaurant,
  updateRestaurant,
} from "../controllers/restaurant.controller";
import { upload } from "../middlewares/multer.middleware";
import verifyToken from "../middlewares/verifyToken.middleware";
const router = express.Router();

router.post("/", verifyToken, upload.single("banner"), createRestaurant);
router.put("/", verifyToken, upload.single("banner"), updateRestaurant);
router.get("/", verifyToken, getRestaurant);
router.get("/:id", verifyToken, getRestaurantById);
router.get("/search/:searchText", verifyToken, searchRestaurant);

export default router;
