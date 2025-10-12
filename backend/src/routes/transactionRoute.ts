import express from "express";
import {
  transferMoney,
  getUserTransactions,
  getMonthlySummary,
} from "../controllers/transactionController";

const router = express.Router();

// POST /api/transactions/transfer
router.post("/transfer", transferMoney);

// GET /api/transactions/:userId/history
router.get("/:userId/history", getUserTransactions);

// GET /api/transactions/:userId/monthly-summary
router.get("/:userId/monthly-summary", getMonthlySummary);

export default router;
