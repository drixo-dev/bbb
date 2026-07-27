const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const mongoose = require('mongoose');
const Participant = require('../models/Participant');

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bbb2026');
    console.log('Connected to MongoDB');

    const result = await Participant.updateMany(
      { paymentStatus: 'Pending' },
      { $set: { paymentStatus: 'Pending Verification' } }
    );

    console.log(`Migration complete. Modified ${result.modifiedCount} documents.`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
