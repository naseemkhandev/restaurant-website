import { NextFunction, Request, Response } from "express";
import { Multer } from "multer";

import Restaurant from "../models/restaurant.model";
import throwError from "../utils/throwError";
import uploadImageOnCloudinary from "../utils/imageUpload";

export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?.userId;
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req?.file;

    const restaurantExist = await Restaurant.findOne({ user: userId });
    if (restaurantExist)
      return next(
        throwError(400, "You cannot create more than one restaurant")
      );
    if (!file) return next(throwError(400, "Restaurant banner is required"));

    const banner = await uploadImageOnCloudinary(file as Express.Multer.File);
    const restaurant = await Restaurant.create({
      user: userId,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      banner,
    });

    res
      .status(201)
      .json({ message: "Restaurant created successfully", restaurant });
  } catch (error) {
    next(error);
  }
};

export const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?.userId;
    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) return next(throwError(404, "Restaurant not found"));

    return res.status(200).json({
      message: "Restaurant found successfully",
      restaurant,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?.userId;
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req?.file;

    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) return next(throwError(404, "Restaurant not found"));

    let banner = restaurant.banner;
    if (file) {
      banner = await uploadImageOnCloudinary(file as Express.Multer.File);
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);
    restaurant.banner = banner;

    await restaurant.save();

    return res
      .status(200)
      .json({ message: "Restaurant updated successfully", restaurant });
  } catch (error) {
    next(error);
  }
};
