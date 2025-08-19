import express from "express";
import cors from "cors";
import { userData } from "./data/user";
import { bankaccountData as bankAccountInfo } from "./data/Bankaccount";
import {
  bankaccountData as pinData,
  userData as pinUserData,
} from "./data/Pin";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript backend!");
});

app.get("/api/user/:id/dashboard", (req, res) => {
  res.json(userData);
});

app.get("/api/bankaccount/:userId", (req, res) => {
  const { userId } = req.params;
  if (userId === bankAccountInfo.userId) {
    res.json(bankAccountInfo);
  } else {
    res.status(404).json({ error: "Bank account not found" });
  }
});

app.post("/api/bankaccount/verify-pin", (req, res) => {
  const { userId, password } = req.body;
  if (userId === pinData.userId && password === pinData.password) {
    res.json({ success: true, message: "Bank account PIN verified" });
  } else {
    res.status(401).json({ success: false, message: "Invalid PIN or userId" });
  }
});

app.post("/api/user/verify-password", (req, res) => {
  const { userId, password } = req.body;
  if (userId === pinUserData.userId && password === pinUserData.password) {
    res.json({ success: true, message: "User password verified" });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid password or userId" });
  }
});

// Check user by phone number
app.get("/api/user/check/:phoneNumber", (req, res) => {
  const { phoneNumber } = req.params;

  if (userData.phone === phoneNumber) {
    res.json({ valid: true, user: userData });
  } else {
    res.status(404).json({ valid: false, message: "Account not found" });
  }
});

export default app;
