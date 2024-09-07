import { Document } from "mongoose";

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  contact: number;
  city: string;
  country: string;
  address: string;
  profilePicture: string;
  isAdmin: boolean;
  isVerified?: boolean;
  lastLogin?: Date;
  resetPasswordToken?: String;
  resetPasswordTokenExpiresAt?: Date;
  verificationToken?: String;
  verificationTokenExpiresAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
