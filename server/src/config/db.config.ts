import mongoose from "mongoose";
import { config } from "./config";

const connectToDB = async () => {
  try {
    await mongoose
      .connect(config.mongoUri as string)
      .then(() => console.log("Successfully Connected to MongoDB"))
      .catch((err) => console.log("Error in connecting to Database: ", err));
  } catch (error) {
    console.log("Failed to connect to Database: ", error);
    process.exit(1);
  }
};

export default connectToDB;
