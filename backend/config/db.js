const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('ℹ️ MONGODB_URI not defined. Application using JSON storage & Google Sheets database.');
    return false;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error: ${error.message}. Falling back to local/Google Sheets storage.`);
    return false;
  }
};

module.exports = connectDB;
