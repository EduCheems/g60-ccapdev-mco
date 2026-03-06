import mongoose from 'mongoose';

import { setServers } from "node:dns/promises";

setServers(["8.8.8.8", "1.1.1.1"]);
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URI environment variable in .env');
}

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URL);
    console.log("Successfully connected to Catpuccino Database");
    console.log("MongoDB URL:", MONGODB_URL);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};