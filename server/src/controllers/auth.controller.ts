import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/user.model";
import throwError from "../utils/throwError";
import generateVerificationToken from "../utils/generateVerificationToken";
import generateJwtToken from "../utils/generateJwtToken";
import sendVerificationEmail from "../utils/sendVerificationEmail";

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
    const verificationToken = generateVerificationToken();

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const userObject = newUser.toObject();
    const { password: userPassword, ...userInfo } = userObject;
    generateJwtToken({ _id: newUser._id, isAdmin: newUser.isAdmin }, res);
    await sendVerificationEmail(email, verificationToken as any);

    return res.status(201).json({
      message: "You have registered successfully",
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

    user.lastLogin = new Date();
    await user.save();

    const userObject = user.toObject();
    const { password: userPassword, ...userInfo } = userObject;

    return res.status(200).json({
      message: `Welcome back, ${userInfo.fullname}`,
      userInfo,
    });
  } catch (error) {
    next(error);
  }
};
