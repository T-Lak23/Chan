import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(ENV.MONGO_URI as string);
    console.log("DB connected", connection.connection.host);
  } catch (error) {
    console.log("Db connection error", error);
    process.exit(1);
  }
};
