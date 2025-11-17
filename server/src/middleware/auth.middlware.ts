import type { NextFunction, Response } from "express";

export const protectRoute = (req: any, res: Response, next: NextFunction) => {
  if (!req.auth().isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
