const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/chat-app";

const ConnectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = ConnectDB;
