import type { Response } from "express";
import { generateToken } from "../config/stream.js";

export const generateUserToken = async (req: any, res: Response) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const token = await generateToken(userId);
    res.status(200).json({ token });
  } catch (error) {
    console.error("error generating token", error);
    res.status(500).json({ message: "Failed to generate token" });
  }
};
