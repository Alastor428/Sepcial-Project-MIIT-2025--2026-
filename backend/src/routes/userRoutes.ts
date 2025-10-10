import express from "express";
import {
  getUserDashboard,
  checkUserByPhone,
  loginUser,
  registerUser,
  getMonthlyTransactions,
} from "../controllers/userControllers";
const router = express.Router();

router.get("/:id/dashboard", getUserDashboard);
router.get("/check/:phoneNumber", checkUserByPhone);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/:id/transactions/monthly", getMonthlyTransactions);

export default router;
