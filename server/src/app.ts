import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { config } from "./config/config";
import errorHandler from "./middlewares/errorHandler.midddleware";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Server is running...</h1>");
});

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;
