const adminDetails = require("./models/details/admin-details.model");
const connectToMongo = require("./database/db");

const testDB = async () => {
  try {
    await connectToMongo();
    console.log("Connected to MongoDB");

    const admins = await adminDetails.find();
    console.log(`Found ${admins.length} admin(s)`);

    if (admins.length > 0) {
      console.log("Admin email:", admins[0].email);
      console.log("Admin password (hashed):", admins[0].password ? "Present" : "Missing");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

testDB();
