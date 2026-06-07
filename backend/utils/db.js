const mongoose = require("mongoose");

const connectDB = async (uri) => {
  console.log("1. Inside connectDB function...");

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("2. MongoDB Connected Successfully");
  } catch (error) {
    console.error("3. Connection Failed:");
    console.error(error);
    throw error;
  }
};

module.exports = connectDB;