import { Request, Response, NextFunction } from "express";
import { Multer } from "multer";

import throwError from "../utils/throwError";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Menu from "../models/menu.model";
import Restaurant from "../models/restaurant.model";

export const addMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price } = req.body;
    const file = req?.file;

    if (!file) return next(throwError(400, "Image is required"));
    const image = await uploadImageOnCloudinary(file as Express.Multer.File);

    const menu = await Menu.create({
      name,
      description,
      price,
      image,
    });

    const restaurant = await Restaurant.findOne({ user: req?.user.userId });

    if (restaurant) {
      restaurant.menus.push(menu._id);
      await restaurant.save();
    }

    res.status(201).json({
      message: "Menu added successfully",
      restaurant,
    });
  } catch (error) {
    next(error);
  }
};
