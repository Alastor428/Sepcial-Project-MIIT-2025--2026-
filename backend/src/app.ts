import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactionRoute";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./config/database";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running!", timestamp: new Date() });
});

export default app;
