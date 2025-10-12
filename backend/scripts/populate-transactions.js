const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Admin_SLH:swanlinnhtun123@mycluster.efvnrgm.mongodb.net/?retryWrites=true&w=majority";

async function populateTransactions() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("test_db");
    const transactionsCollection = db.collection("transactions");

    // Clear existing transactions
    await transactionsCollection.deleteMany({});
    console.log("Cleared existing transactions");

    // Get users from database
    const users = await db.collection("users").find({}).toArray();
    console.log(`Found ${users.length} users`);

    if (users.length < 2) {
      console.log("Need at least 2 users to create transactions");
      return;
    }

    const user1 = users[0];
    const user2 = users[1];

    // Create realistic sample transactions
    const sampleTransactions = [
      // Recent transactions (current month)
      {
        id: "txn_001",
        senderId: user1.userId,
        receiverId: user2.userId,
        senderName: user1.name,
        receiverName: user2.name,
        amount: 50000,
        type: "transfer",
        description: `Transfer to ${user2.name}`,
        timestamp: new Date("2024-12-15T10:30:00Z"),
        date: "15 Dec 2024",
        time: "10:30 AM",
      },
      {
        id: "txn_002",
        senderId: user2.userId,
        receiverId: user1.userId,
        senderName: user2.name,
        receiverName: user1.name,
        amount: 25000,
        type: "transfer",
        description: `Transfer to ${user1.name}`,
        timestamp: new Date("2024-12-18T14:15:00Z"),
        date: "18 Dec 2024",
        time: "2:15 PM",
      },
      {
        id: "txn_003",
        senderId: user1.userId,
        receiverId: user2.userId,
        senderName: user1.name,
        receiverName: user2.name,
        amount: 75000,
        type: "transfer",
        description: `Transfer to ${user2.name}`,
        timestamp: new Date("2024-12-20T09:45:00Z"),
        date: "20 Dec 2024",
        time: "9:45 AM",
      },
      {
        id: "txn_004",
        senderId: user2.userId,
        receiverId: user1.userId,
        senderName: user2.name,
        receiverName: user1.name,
        amount: 30000,
        type: "transfer",
        description: `Transfer to ${user1.name}`,
        timestamp: new Date("2024-12-22T16:20:00Z"),
        date: "22 Dec 2024",
        time: "4:20 PM",
      },
      {
        id: "txn_005",
        senderId: user1.userId,
        receiverId: user2.userId,
        senderName: user1.name,
        receiverName: user2.name,
        amount: 100000,
        type: "transfer",
        description: `Transfer to ${user2.name}`,
        timestamp: new Date("2024-12-25T11:00:00Z"),
        date: "25 Dec 2024",
        time: "11:00 AM",
      },
      // Previous month transactions
      {
        id: "txn_006",
        senderId: user2.userId,
        receiverId: user1.userId,
        senderName: user2.name,
        receiverName: user1.name,
        amount: 40000,
        type: "transfer",
        description: `Transfer to ${user1.name}`,
        timestamp: new Date("2024-11-10T13:30:00Z"),
        date: "10 Nov 2024",
        time: "1:30 PM",
      },
      {
        id: "txn_007",
        senderId: user1.userId,
        receiverId: user2.userId,
        senderName: user1.name,
        receiverName: user2.name,
        amount: 60000,
        type: "transfer",
        description: `Transfer to ${user2.name}`,
        timestamp: new Date("2024-11-15T08:45:00Z"),
        date: "15 Nov 2024",
        time: "8:45 AM",
      },
      {
        id: "txn_008",
        senderId: user2.userId,
        receiverId: user1.userId,
        senderName: user2.name,
        receiverName: user1.name,
        amount: 35000,
        type: "transfer",
        description: `Transfer to ${user1.name}`,
        timestamp: new Date("2024-11-20T15:15:00Z"),
        date: "20 Nov 2024",
        time: "3:15 PM",
      },
      {
        id: "txn_009",
        senderId: user1.userId,
        receiverId: user2.userId,
        senderName: user1.name,
        receiverName: user2.name,
        amount: 80000,
        type: "transfer",
        description: `Transfer to ${user2.name}`,
        timestamp: new Date("2024-11-25T12:00:00Z"),
        date: "25 Nov 2024",
        time: "12:00 PM",
      },
      {
        id: "txn_010",
        senderId: user2.userId,
        receiverId: user1.userId,
        senderName: user2.name,
        receiverName: user1.name,
        amount: 45000,
        type: "transfer",
        description: `Transfer to ${user1.name}`,
        timestamp: new Date("2024-11-30T17:30:00Z"),
        date: "30 Nov 2024",
        time: "5:30 PM",
      },
    ];

    // Insert sample transactions
    const result = await transactionsCollection.insertMany(sampleTransactions);
    console.log(`Inserted ${result.insertedCount} sample transactions`);

    console.log("Sample transactions created successfully!");
    console.log(
      "Transaction amounts range from 25,000 to 100,000 Ks (realistic amounts)"
    );
  } catch (error) {
    console.error("Error populating transactions:", error);
  } finally {
    await client.close();
  }
}

populateTransactions();
