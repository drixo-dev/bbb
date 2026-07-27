const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Participant = require('../models/Participant');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    try {
      await Participant.collection.dropIndex('email_1');
      console.log('Dropped email_1 index');
    } catch (err) { console.log('email_1 index drop error (maybe not exists):', err.message); }
    try {
      await Participant.collection.dropIndex('phone_1');
      console.log('Dropped phone_1 index');
    } catch (err) { console.log('phone_1 index drop error (maybe not exists):', err.message); }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
