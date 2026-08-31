import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  if (!env.mongoUri) {
    if (env.nodeEnv === "production") {
      throw new Error("MONGODB_URI is required in production.");
    }
    console.warn("MONGODB_URI is not set. Contact persistence is disabled.");
    return false;
  }

  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("MongoDB connected");
  return true;
}
