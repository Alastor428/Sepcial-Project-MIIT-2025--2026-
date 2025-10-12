import { Request, Response } from "express";
import { getDB } from "../config/database";

export const transferMoney = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverPhone, amount } = req.body;

    if (!senderId || !receiverPhone || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const db = getDB();

    // Find sender and receiver
    const sender = await db.collection("users").findOne({ userId: senderId });
    const receiver = await db
      .collection("users")
      .findOne({ phone: receiverPhone });

    if (!sender) return res.status(404).json({ error: "Sender not found" });
    if (!receiver) return res.status(404).json({ error: "Receiver not found" });

    if (sender.balance < numericAmount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Update balances
    await db
      .collection("users")
      .updateOne({ userId: senderId }, { $inc: { balance: -numericAmount } });
    await db
      .collection("users")
      .updateOne(
        { phone: receiverPhone },
        { $inc: { balance: numericAmount } }
      );

    // Save transaction with more details
    const transaction = {
      from: senderId,
      to: receiverPhone,
      fromName: sender.name,
      toName: receiver.name,
      amount: numericAmount,
      timestamp: new Date(),
      type: "transfer",
    };
    await db.collection("transactions").insertOne(transaction);

    // Get updated sender balance
    const updatedSender = await db
      .collection("users")
      .findOne({ userId: senderId });

    res.status(200).json({
      message: "Transfer successful",
      transaction,
      sender: updatedSender,
    });
  } catch (error) {
    console.error("Transfer error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get transaction history for a user
export const getUserTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { year, month } = req.query;

    const db = getDB();

    // Build date filter
    let dateFilter = {};
    if (year && month) {
      const startDate = new Date(
        parseInt(year as string),
        parseInt(month as string) - 1,
        1
      );
      const endDate = new Date(
        parseInt(year as string),
        parseInt(month as string),
        0,
        23,
        59,
        59
      );
      dateFilter = {
        timestamp: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    }

    // Get user to find their phone number
    const user = await db.collection("users").findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get transactions where user is sender or receiver
    const transactions = await db
      .collection("transactions")
      .find({
        $or: [{ from: userId }, { to: user.phone }],
        ...dateFilter,
      })
      .sort({ timestamp: -1 })
      .toArray();

    // Format transactions for frontend
    const formattedTransactions = transactions.map((transaction: any) => {
      const isOutflow = transaction.from === userId;
      return {
        id: transaction._id,
        type: isOutflow ? "outflow" : "inflow",
        amount: transaction.amount,
        otherParty: isOutflow ? transaction.toName : transaction.fromName,
        otherPartyPhone: isOutflow ? transaction.to : transaction.from,
        timestamp: transaction.timestamp,
        date: transaction.timestamp.toLocaleDateString(),
        time: transaction.timestamp.toLocaleTimeString(),
        description: isOutflow
          ? `Transfer to ${transaction.toName}`
          : `Transfer from ${transaction.fromName}`,
      };
    });

    res.json(formattedTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Get monthly transaction summary
export const getMonthlySummary = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { year, month } = req.query;

    const db = getDB();

    // Build date filter
    const startDate = new Date(
      parseInt(year as string),
      parseInt(month as string) - 1,
      1
    );
    const endDate = new Date(
      parseInt(year as string),
      parseInt(month as string),
      0,
      23,
      59,
      59
    );

    // Get user to find their phone number
    const user = await db.collection("users").findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get transactions for the month
    const transactions = await db
      .collection("transactions")
      .find({
        $or: [{ from: userId }, { to: user.phone }],
        timestamp: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .toArray();

    // Calculate daily totals
    const dailyData: { [key: number]: { inflow: number; outflow: number } } =
      {};
    const daysInMonth = new Date(
      parseInt(year as string),
      parseInt(month as string),
      0
    ).getDate();

    // Initialize all days with 0
    for (let day = 1; day <= daysInMonth; day++) {
      dailyData[day] = { inflow: 0, outflow: 0 };
    }

    // Process transactions
    transactions.forEach((transaction: any) => {
      const day = transaction.timestamp.getDate();
      const isOutflow = transaction.from === userId;

      if (isOutflow) {
        dailyData[day].outflow += transaction.amount;
      } else {
        dailyData[day].inflow += transaction.amount;
      }
    });

    // Convert to arrays for chart
    const inflowData = Object.values(dailyData).map((day: any) => day.inflow);
    const outflowData = Object.values(dailyData).map((day: any) => day.outflow);

    res.json({
      inflow: inflowData,
      outflow: outflowData,
      totalInflow: inflowData.reduce((a, b) => a + b, 0),
      totalOutflow: outflowData.reduce((a, b) => a + b, 0),
    });
  } catch (error) {
    console.error("Error fetching monthly summary:", error);
    res.status(500).json({ error: "Failed to fetch monthly summary" });
  }
};
