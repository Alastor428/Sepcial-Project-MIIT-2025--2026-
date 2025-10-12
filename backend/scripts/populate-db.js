const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Admin_SLH:swanlinnhtun123@mycluster.efvnrgm.mongodb.net/?retryWrites=true&w=majority";

const testUsers = [
  {
    name: "Linn Pa Pa Khaing",
    userId: "123456789",
    balance: 100000.0,
    phone: "09696185624",
    pin: "798112",
    gender: "Female",
    employment: "Student",
    dob: "2005-02-09",
    nrc: "13/MaSaTa(N)069814",
    avatar: "https://example.com/avatar.jpg",
    createdAt: new Date(),
  },
  {
    name: "Swan Linn Htun",
    userId: "428563131",
    balance: 50000.0,
    phone: "09265572697",
    pin: "270404",
    gender: "Male",
    employment: "Student",
    dob: "2004-05-17",
    nrc: "12/KaLaTa(N)123456",
    avatar: "https://example.com/avatar2.jpg",
    createdAt: new Date(),
  },
];

async function populateDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("test_db");
    const usersCollection = db.collection("users");

    // Clear existing users (optional - remove this if you want to keep existing data)
    console.log("🗑️ Clearing existing users...");
    await usersCollection.deleteMany({});

    // Insert test users
    console.log("📝 Inserting test users...");
    const result = await usersCollection.insertMany(testUsers);
    console.log(`✅ Inserted ${result.insertedCount} users`);

    // Verify the data
    const count = await usersCollection.countDocuments();
    console.log(`📊 Total users in database: ${count}`);

    const users = await usersCollection.find({}).toArray();
    console.log("👥 Users in database:");
    users.forEach((user) => {
      console.log(
        `  - ${user.name} (${user.userId}) - Balance: ${user.balance}`
      );
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

populateDatabase();
