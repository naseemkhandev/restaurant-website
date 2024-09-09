import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware";
import { addMenu, updateMenu } from "../controllers/menu.controller";
import { upload } from "../middlewares/multer.middleware";
const router = express.Router();

router.post("/", verifyToken, upload.single("image"), addMenu);
router.patch("/:id", verifyToken, upload.single("image"), updateMenu);

export default router;
