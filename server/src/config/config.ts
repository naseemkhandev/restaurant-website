import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryCloudName: process.env.CLOUDINARY_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  mailtrapApiToken: process.env.MAILTRAP_API_TOKEN,
  mailtrapEmail: process.env.MAILTRAP_EMAIL,
  mailtrapName: process.env.MAILTRAP_NAME,
};

export const config = Object.freeze(_config);
