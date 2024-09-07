import { IMenuDocument } from "./../types/menu.type";
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema<IMenuDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
