const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/chat-app";

const ConnectDB = async () => {
  await mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

module.exports = ConnectDB;
