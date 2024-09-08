import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import throwError from "../utils/throwError";
import { config } from "./../config/config";

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return next(throwError(401, "User not authenticated"));

    const decoded = jwt.verify(token, config.jwtSecret!) as jwt.JwtPayload;
    if (!decoded) return next(throwError(401, "Invalid token"));

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
