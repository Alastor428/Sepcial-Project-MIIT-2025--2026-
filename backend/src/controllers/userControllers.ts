import { Request, Response } from "express";
import { users } from "../data/user";

export const getUserDashboard = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((u) => u.userId === id);

  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
};

export const checkUserByPhone = (req: Request, res: Response) => {
  const { phoneNumber } = req.params;
  const user = users.find((u) => u.phone === phoneNumber);

  if (user) res.json({ valid: true, user });
  else res.status(404).json({ valid: false, message: "Account not found" });
};

export const loginUser = (req: Request, res: Response) => {
  const { phone, pin } = req.body;
  const user = users.find((u) => u.phone === phone && u.pin === pin);
  if (!user) return res.status(401).json({ message: "Invalid phone or PIN" });
  res.json(user);
};

export const registerUser = (req: Request, res: Response) => {
  const { name, phone, pin, nrc, dob, gender, employment } = req.body;

  // Check if user already exists
  const existingUser = users.find((u) => u.phone === phone);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Generate userId (simple random for demo)
  const userId = Math.floor(Math.random() * 1000000000).toString();

  const newUser = {
    name,
    userId,
    balance: 0.0,
    phone,
    pin,
    gender,
    employment,
    dob,
    nrc,
    avatar: "https://example.com/avatar.jpg",
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

export const getMonthlyTransactions = (req: Request, res: Response) => {
  const { id } = req.params;
  // Mock data for monthly inflow/outflow
  const mockData = [
    { month: "Jan", inflow: 50000, outflow: 30000 },
    { month: "Feb", inflow: 60000, outflow: 25000 },
    { month: "Mar", inflow: 70000, outflow: 40000 },
    { month: "Apr", inflow: 80000, outflow: 35000 },
    { month: "May", inflow: 90000, outflow: 45000 },
    { month: "Jun", inflow: 100000, outflow: 50000 },
  ];
  res.json(mockData);
};
