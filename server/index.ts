import app from "./src/app";
import { config } from "./src/config/config";
import connectToDB from "./src/config/db.config";

const startServer = async () => {
  try {
    connectToDB();

    app.listen(config.port, () =>
      console.log(`Server is running on port ${config.port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
