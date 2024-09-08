import { Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "../config/config";
import mongoose from "mongoose";

const generateToken = (
  user: { _id: mongoose.Schema.Types.ObjectId; isAdmin: boolean },
  res: Response
) => {
  const { _id, isAdmin } = user;

  const token = jwt.sign(
    { userId: _id, isAdmin: isAdmin },
    config.jwtSecret as string,
    {
      expiresIn: "15d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    secure: config.env !== "development",
    sameSite: config.env !== "development" ? "strict" : undefined,
  });

  return token;
};

export default generateToken;
