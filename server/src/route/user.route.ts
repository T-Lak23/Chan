import express from "express";
import { generateUserToken } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middlware.js";

const router = express.Router();

router.get("/token", protectRoute, generateUserToken);

export default router;
