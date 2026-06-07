const mongoose = require('mongoose');

const connectDB = async (uri) => {
  if (!uri) {
    throw new Error('MongoDB connection URI is required');
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB_NAME,
  });
};

module.exports = connectDB;
