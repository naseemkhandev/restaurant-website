import { NextFunction, Request, Response } from "express";

import Order from "../models/order.model";
import Restaurant from "../models/restaurant.model";
import throwError from "../utils/throwError";

export const getRestaurantOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?.userId;

    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) return next(throwError(404, "Restaurant not found"));

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("user", "-password")
      .populate("restaurant");

    return res.status(200).json({
      message: "Orders found successfully",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({ _id: id });
    if (!order) return next(throwError(404, "Order not found"));

    order?.status = status;
    await order.save();

    return res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    next(error);
  }
};
