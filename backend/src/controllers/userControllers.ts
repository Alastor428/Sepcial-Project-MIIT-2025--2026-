import { Request, Response } from "express";
import { users } from "../data/user";
import { getDB } from "../config/database";

export const getUserDashboard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const user = await db.collection("users").findOne({ userId: id });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user dashboard:", error);
    res.status(500).json({ error: "Failed to fetch user dashboard" });
  }
};

export const checkUserByPhone = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;
    const db = getDB();
    const user = await db.collection("users").findOne({ phone: phoneNumber });

    if (user) {
      res.json({ valid: true, user });
    } else {
      res.status(404).json({ valid: false, message: "Account not found" });
    }
  } catch (error) {
    console.error("Error checking user by phone:", error);
    res.status(500).json({ error: "Failed to check user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { phone, pin } = req.body;
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ phone: phone, pin: pin });

    if (!user) {
      return res.status(401).json({ message: "Invalid phone or PIN" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phone, pin, nrc, dob, gender, employment } = req.body;
    const db = getDB();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ phone: phone });
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
      createdAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);
    res.status(201).json({ id: result.insertedId, ...newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
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

// New CRUD operations for testing with Postman
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const user = req.body;
    user.createdAt = new Date();
    const result = await db.collection("users").insertOne(user);
    res.status(201).json({ id: result.insertedId, ...user });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const user = await db.collection("users").findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const updateData = { ...req.body, updatedAt: new Date() };
    const result = await db
      .collection("users")
      .updateOne({ _id: id }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const result = await db.collection("users").deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
