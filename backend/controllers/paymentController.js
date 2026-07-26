const Participant = require('../models/Participant');
const googleService = require('../services/googleService');
const emailService = require('../services/emailService');
const whatsappService = require('../services/whatsappService');
const path = require('path');

const submitPayment = async (req, res) => {
  try {
    const { registrationId, transactionId } = req.body;

    if (!registrationId || !transactionId) {
      return res.status(400).json({ success: false, message: 'Registration ID and Transaction ID (UTR) are required.' });
    }

    const participant = await Participant.findOne({ registrationId });
    if (!participant) {
      return res.status(404).json({ success: false, message: 'Registration record not found.' });
    }

    if (participant.paymentStatus === 'Pending' || participant.paymentStatus === 'Approved') {
      return res.status(400).json({ success: false, message: `Payment already submitted. Current status: ${participant.paymentStatus}` });
    }

    let localScreenshotUrl = participant.screenshotUrl;
    let driveUrl = participant.driveScreenshotUrl;

    if (req.file) {
      localScreenshotUrl = `/uploads/${req.file.filename}`;
      const fullPath = req.file.path;
      // Try uploading to Google Drive
      const uploadedDriveUrl = await googleService.uploadToDrive(fullPath, req.file.filename);
      if (uploadedDriveUrl) {
        driveUrl = uploadedDriveUrl;
      }
    }

    participant.transactionId = transactionId.trim();
    participant.screenshotUrl = localScreenshotUrl;
    participant.driveScreenshotUrl = driveUrl || '';
    participant.paymentStatus = 'Pending';
    participant.registrationStatus = 'Submitted';

    const updatedParticipant = await participant.save();

    // Async sync to Google Sheets
    googleService.appendToSheet(updatedParticipant).catch(err => console.error('Sheet sync background error:', err));

    // Send email & WhatsApp notification simulation
    emailService.sendConfirmationEmail(updatedParticipant).catch(err => console.error('Email background error:', err));
    whatsappService.sendWhatsAppMessage(updatedParticipant).catch(err => console.error('WhatsApp background error:', err));

    return res.status(200).json({
      success: true,
      message: 'Payment details submitted successfully! Your registration is now under review.',
      data: updatedParticipant
    });
  } catch (error) {
    console.error('Error in submitPayment:', error);
    return res.status(500).json({ success: false, message: 'Server error while submitting payment.' });
  }
};

module.exports = { submitPayment };
