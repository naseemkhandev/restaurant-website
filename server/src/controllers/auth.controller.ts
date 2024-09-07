import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/user.model";
import throwError from "../utils/throwError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, email, password, contact } = req.body;

    const user = await User.findOne({ email });
    if (user) return next(throwError(400, "User already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
    });

    const userObject = newUser.toObject();
    const { password: userPassword, ...userInfo } = userObject;

    return res.status(201).json({
      message: "User registered successfully",
      userInfo,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(throwError(400, "Wrong email or password"));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return next(throwError(400, "Wrong email or password"));

    const userObject = user.toObject();
    const { password: userPassword, ...userInfo } = userObject;

    return res.status(200).json({
      message: "User logged in successfully",
      userInfo,
    });
  } catch (error) {
    next(error);
  }
};
