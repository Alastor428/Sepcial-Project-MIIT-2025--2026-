import express from "express";
import {
  getUserDashboard,
  checkUserByPhone,
  loginUser,
  registerUser,
  getMonthlyTransactions,
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userControllers";
const router = express.Router();

// Basic CRUD operations for testing
router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Original app routes
router.get("/:id/dashboard", getUserDashboard);
router.get("/check/:phoneNumber", checkUserByPhone);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/:id/transactions/monthly", getMonthlyTransactions);

export default router;
