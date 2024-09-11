import { NextFunction, Response } from "express";
import throwError from "../utils/throwError";
import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlContent";
import { client, sender } from "./index";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
  res: Response,
  next: NextFunction
) => {
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });

    return res.status(200).json({
      message: "Verification email sent successfully",
    });
  } catch (error) {
    next(throwError(500, "Failed to send verification email"));
  }
};

export const sendWelcomeEmail = async (
  email: string,
  name: string,
  next: NextFunction
) => {
  try {
    await client.send({
      from: sender as any,
      to: email as any,
      subject: "Welcome to Our Service",
      html: generateWelcomeEmailHtml(name),
      category: "Welcome Email",
    });
  } catch (error) {
    next(throwError(500, "Failed to send welcome email"));
  }
};

export const sendResetPasswordEmail = async (
  email: string,
  resetUrl: string,
  next: NextFunction
) => {
  try {
    const res = await client.send({
      from: sender as any,
      to: email as any,
      subject: "Reset Your Password",
      html: generatePasswordResetEmailHtml(resetUrl),
      category: "Reset Your Password",
    });
  } catch (error) {
    next(throwError(500, "Failed to send reset your password email"));
  }
};

export const sendResetPasswordSuccessEmail = async (
  email: string,
  name: string,
  next: NextFunction
) => {
  try {
    const res = await client.send({
      from: sender as any,
      to: email as any,
      subject: "Password Reset Successful",
      html: generateResetSuccessEmailHtml(),
      category: "Password Reset Successful",
    });
  } catch (error) {
    next(throwError(500, "Failed to send reset password success email"));
  }
};
