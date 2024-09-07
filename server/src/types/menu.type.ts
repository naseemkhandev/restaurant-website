import mongoose, { Document } from "mongoose";

export interface IMenu {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface IMenuDocument extends IMenu, Document {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
