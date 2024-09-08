import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

import { config } from "../config/config";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
} from "../mailtrap/email";
import User from "../models/user.model";
import generateJwtToken from "../utils/generateJwtToken";
import generateVerificationCode from "../utils/generateVerificationCode";
import sendResetPasswordSuccessEmail from "../utils/sendResetPasswordSuccessEmail";
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
    const verificationToken = generateVerificationCode();

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
    await sendVerificationEmail(email, verificationToken as any, next);

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

    generateJwtToken({ _id: user._id, isAdmin: user.isAdmin }, res);
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

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logged out successful" });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: new Date() },
    }).select("-password");

    if (!user) return next(throwError(400, "Invalid or expired token"));
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.fullname, next);

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).select("-password");
    if (!user) return next(throwError(400, "User not found"));

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set reset token and expiration date on the user document
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes

    await user.save();
    // Send reset password email
    const resetUrl = `${config.clientUrl}/resetPassword/${resetToken}`;
    await sendResetPasswordEmail(user.email, resetUrl, next);

    return res.status(200).json({
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, password } = req.body;

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordTokenExpiresAt: { $gt: new Date() },
    });
    if (!user) return next(throwError(400, "Invalid or expired token"));

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();
    await sendResetPasswordSuccessEmail(user.email);

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};
