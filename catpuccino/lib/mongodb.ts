import mongoose from 'mongoose';
import { MongoClient } from 'mongodb'; 
import {setServers} from "node:dns/promises";


setServers(["8.8.8.8","1.1.1.1"]);
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

// -- NextAuth client -- 
const client = new MongoClient(MONGODB_URI);
const clientPromise = client.connect(); 

export default clientPromise; 