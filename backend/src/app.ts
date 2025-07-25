import express from "express";
import cors from "cors";
import { userData } from "./data/user";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript backend!");
});

app.get("/api/user/:id/dashboard", (req, res) => {
  res.json(userData);
});

export default app;
