import express from "express";
import { config } from "./src/config/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(config.port, () => {
  console.log(`Server is running on ${config.port}`);
});
