import { NextFunction, Request, Response } from "express";

import Order from "../models/order.model";
import Restaurant from "../models/restaurant.model";
import throwError from "../utils/throwError";

type CheckoutSessionRequest = {
  orderItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  restaurantId: string;
};

export const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    ).populate("menus");
    if (!restaurant) return next(throwError(404, "Restaurant not found"));

    return res.status(200).json({
      message: "Checkout session created successfully",
      restaurant,
    });
  } catch (error) {
    next(error);
  }
};
