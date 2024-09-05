import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email address is too long" }),
  fullname: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(255, { message: "Full name is too long" }),
  password: z
    .string()
    .min(6, { message: "Password must be atlesat 6 characters" })
    .max(255, { message: "Password is too long" }),
  contact: z
    .string()
    .min(1, { message: "Contact is required" })
    .max(11, { message: "Contact is too long" }),
});

export type RegisterInputState = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email address is too long" }),
  password: z
    .string()
    .min(6, { message: "Password must be atlesat 6 characters" })
    .max(255, { message: "Password is too long" }),
});

export type LoginInputState = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email address is too long" }),
});

export type ForgotPasswordInputState = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be atlesat 6 characters" })
    .max(255, { message: "Password is too long" }),
});

export type ResetPasswordInputState = z.infer<typeof resetPasswordSchema>;
