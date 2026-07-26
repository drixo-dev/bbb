const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true }
}, { _id: false });

const participantSchema = new mongoose.Schema({
  registrationId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, index: true },
  email: { type: String, default: '' },
  phone: { type: String, required: true },
  school: { type: String, required: true },
  passType: { type: String, enum: ['Single Pass', 'Couple Pass', 'Group Pass (4 People)'], required: true },
  amount: { type: Number, required: true },
  members: [memberSchema],
  transactionId: { type: String, default: '' },
  screenshotUrl: { type: String, default: '' },
  driveScreenshotUrl: { type: String, default: '' },
  paymentStatus: { type: String, enum: ['Not Submitted', 'Pending', 'Approved', 'Rejected'], default: 'Not Submitted' },
  registrationStatus: { type: String, enum: ['Submitted', 'Verified', 'Cancelled'], default: 'Submitted' },
  checkedIn: { type: Boolean, default: false },
  checkedInAt: { type: Date, default: null }
}, {
  timestamps: true
});

module.exports = mongoose.models.Participant || mongoose.model('Participant', participantSchema);
