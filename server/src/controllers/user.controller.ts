import { NextFunction, Request, Response } from "express";

import User from "../models/user.model";
import throwError from "../utils/throwError";

export const getAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) return next(throwError(400, "User not found"));

    return res.status(200).json({
      message: "User authenticated",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
