import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import { setServers } from 'node:dns/promises';


setServers(['8.8.8.8', '1.1.1.1']);

const MONGODB_URI = process.env.MONGODB_URL as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URL environment variable inside .env');
}

declare global {
  var mongooseCache: { conn: any; promise: any } | undefined;
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    mongoose.set('strictQuery', false);
    
    cached!.promise = mongoose.connect(MONGODB_URI, { 
      family: 4,
      serverSelectionTimeoutMS: 5000 
    }).then((mongooseInstance) => {
      console.log("🐈 Successfully connected to Catpuccino Database");
      return mongooseInstance;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
};

// ==========================================
// 3. NEXTAUTH MONGOCLIENT CACHE LOGIC
// ==========================================
let clientPromise: Promise<MongoClient>;

if (!global.mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI, { 
    family: 4, 
    serverSelectionTimeoutMS: 5000 
  });
  global.mongoClientPromise = client.connect();
}
clientPromise = global.mongoClientPromise!;

export default clientPromise;