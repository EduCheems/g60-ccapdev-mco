import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URL environment variable in .env');
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URL);
    console.log("Successfully connected to Catpuccino Database");
    console.log("MongoDB URL:", MONGODB_URL);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};