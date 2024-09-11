import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";

const errorHandler = (
  err: { status: number; message: string; stack: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    success: false,
    status,
    message,
    stack: config.env === "development" ? err.stack : null,
  });
  next();
};

export default errorHandler;
