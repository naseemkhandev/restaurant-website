import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "Register route" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
