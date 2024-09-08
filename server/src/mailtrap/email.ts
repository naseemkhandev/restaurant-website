import { NextFunction } from "express";

import throwError from "../utils/throwError";
import { client, sender } from "./index";
import { config } from "../config/config";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
  next: NextFunction
) => {
  try {
    const res = await client.send({
      from: sender as any,
      to: email as any,
      subject: "Account Verification",
      html: `<h1>Account Verification</h1>
      <p>Click the link below to verify your account</p>
      <a href="${config.clientUrl}/verify-email/${verificationToken}">Verify Account</a>`,
      category: "Email Verification",
    });
  } catch (error) {
    next(throwError(500, "Failed to send verification email"));
  }
};

export const sendWelcomeEmail = async (
  email: string,
  fullname: string,
  next: NextFunction
) => {
  try {
    const res = await client.send({
      from: sender as any,
      to: email as any,
      subject: "Welcome to Foodie",
      html: `<h1>Welcome to Foodie</h1>
      <p>Hi ${fullname},</p>
      <p>Welcome to Foodie, your favorite food ordering app.</p>`,
      category: "Welcome Email",
      template_variables: {
        company_name: "Foodie",
        user_name: fullname,
      },
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
      html: `<h1>Reset Your Password</h1>
      <p>Click the link below to reset your password</p>
      <a href="${resetUrl}">Reset Your Password</a>`,
      category: "Reset Your Password",
    });
  } catch (error) {
    next(throwError(500, "Failed to send reset your password email"));
  }
};
