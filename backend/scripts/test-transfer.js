const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Admin_SLH:swanlinnhtun123@mycluster.efvnrgm.mongodb.net/?retryWrites=true&w=majority";

async function testTransferFlow() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("test_db");
    const usersCollection = db.collection("users");

    // Get initial balances
    const sender = await usersCollection.findOne({ userId: "123456789" });
    const receiver = await usersCollection.findOne({ userId: "428563131" });

    console.log("📊 Initial Balances:");
    console.log(`  Sender (${sender.name}): ${sender.balance} Ks`);
    console.log(`  Receiver (${receiver.name}): ${receiver.balance} Ks`);

    // Simulate a transfer of 10000 Ks
    const transferAmount = 10000;
    console.log(
      `\n💰 Simulating transfer of ${transferAmount} Ks from ${sender.name} to ${receiver.name}`
    );

    // Update balances (simulating what the backend does)
    await usersCollection.updateOne(
      { userId: sender.userId },
      { $inc: { balance: -transferAmount } }
    );
    await usersCollection.updateOne(
      { userId: receiver.userId },
      { $inc: { balance: transferAmount } }
    );

    // Get updated balances
    const updatedSender = await usersCollection.findOne({
      userId: sender.userId,
    });
    const updatedReceiver = await usersCollection.findOne({
      userId: receiver.userId,
    });

    console.log("\n📊 Updated Balances:");
    console.log(
      `  Sender (${updatedSender.name}): ${updatedSender.balance} Ks`
    );
    console.log(
      `  Receiver (${updatedReceiver.name}): ${updatedReceiver.balance} Ks`
    );

    // Verify the transfer
    const expectedSenderBalance = sender.balance - transferAmount;
    const expectedReceiverBalance = receiver.balance + transferAmount;

    if (
      updatedSender.balance === expectedSenderBalance &&
      updatedReceiver.balance === expectedReceiverBalance
    ) {
      console.log("\n✅ Transfer simulation successful!");
    } else {
      console.log("\n❌ Transfer simulation failed!");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

testTransferFlow();
