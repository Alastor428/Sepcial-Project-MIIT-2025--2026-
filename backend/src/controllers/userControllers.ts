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
