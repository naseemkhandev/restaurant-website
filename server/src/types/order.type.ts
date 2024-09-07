import mongoose, { Document } from "mongoose";

type DeliveryDetails = {
  name: string;
  email: string;
  address: string;
  city: string;
};

type OrderItems = {
  menuId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
  image: string;
};

export interface IOrder {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  deliveryDetails: DeliveryDetails;
  orderItems: OrderItems[];
  paymentStatus:
    | "pending"
    | "confirmed"
    | "preparing"
    | "outfordelivery"
    | "delivered";
  totalAmount: number;
}

export interface IOrderDocument extends IOrder, Document {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
