import { NextFunction, Request, Response } from "express";

import User from "../models/user.model";
import throwError from "../utils/throwError";
import cloudinary from "../config/cloudinary.config";

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

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } =
      req.body;
    let cloudResponse: any;
    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture,
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
