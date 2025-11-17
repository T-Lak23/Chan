import express, { type Response } from "express";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";
import { ENV } from "./config/env.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/user", userRoute);

app.get("/", (_, res: Response) => {
  res.json("hello");
});

const PORT = ENV.PORT;

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log("Listening on port", PORT);
      });
    } else {
    }
  } catch (error) {
    console.log("error starting server", error);
  }
};

startServer();
export default app;
