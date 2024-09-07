import mongoose from "mongoose";
import { IOrderDocument } from "../types/order.type";

const orderSchema = new mongoose.Schema<IOrderDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    deliveryDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    orderItems: [
      {
        menuId: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "outfordelivery",
        "delivered",
      ],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
