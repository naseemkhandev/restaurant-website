import mongoose, { Document } from "mongoose";

export interface IRestaurant {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  banner: string;
  menus: mongoose.Schema.Types.ObjectId[];
}

export interface IRestaurantDocument extends IRestaurant, Document {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
