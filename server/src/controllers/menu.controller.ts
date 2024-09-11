import { Request, Response, NextFunction } from "express";
import { Multer } from "multer";

import throwError from "../utils/throwError";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Menu from "../models/menu.model";
import Restaurant from "../models/restaurant.model";
import mongoose from "mongoose";

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
    if (!req.user) return next(throwError(401, "Unauthorized"));
    const restaurant = await Restaurant.findOne({ user: req.user.userId });

    if (restaurant) {
      (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
      await restaurant.save();
    }

    return res.status(201).json({
      message: "Menu added successfully",
      restaurant,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price } = req.body;
    const file = req?.file;

    const menu = await Menu.findById(req.params.id);
    if (!menu) return next(throwError(404, "Menu not found"));

    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;
    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      menu.image = imageUrl;
    }
    await menu.save();

    return res.status(200).json({
      message: "Menu updated successfully",
      menu,
    });
  } catch (error) {
    next(error);
  }
};
