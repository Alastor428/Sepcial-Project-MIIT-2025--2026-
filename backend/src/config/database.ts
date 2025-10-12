import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Admin_SLH:swanlinnhtun123@mycluster.efvnrgm.mongodb.net/?retryWrites=true&w=majority";

let client: MongoClient;
let db: any;

export const connectDB = async () => {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db("test_db"); // Use your database name - change this if you created users in a different database
    console.log("✅ Connected to MongoDB Atlas");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
};
