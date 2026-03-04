import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env');
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to Catpuccino Database");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};