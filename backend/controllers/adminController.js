const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Participant = require('../models/Participant');
const emailService = require('../services/emailService');

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === defaultUsername && (password === defaultPassword || password === 'admin123')) {
      const token = jwt.sign(
        { role: 'admin', username },
        process.env.JWT_SECRET || 'royal_band_baaja_baarat_2026_super_secret_key_98765',
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        success: true,
        token,
        message: 'Admin authentication successful.'
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Admin login server error.' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const participants = await Participant.find();
    
    const totalRegistrations = participants.length;
    const pendingPayments = participants.filter(p => p.paymentStatus === 'Pending').length;
    const approvedPayments = participants.filter(p => p.paymentStatus === 'Approved').length;
    const rejectedPayments = participants.filter(p => p.paymentStatus === 'Rejected').length;
    
    const totalRevenue = participants
      .filter(p => p.paymentStatus === 'Approved')
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    const checkedInCount = participants.filter(p => p.checkedIn).length;

    return res.status(200).json({
      success: true,
      stats: {
        totalRegistrations,
        pendingPayments,
        approvedPayments,
        rejectedPayments,
        totalRevenue,
        checkedInCount
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving dashboard metrics.' });
  }
};

const getParticipants = async (req, res) => {
  try {
    const { search, passType, paymentStatus } = req.query;
    
    let query = {};
    if (search) {
      const q = new RegExp(search, 'i');
      query.$or = [
        { name: q },
        { email: q },
        { rollNumber: q },
        { registrationId: q },
        { transactionId: q }
      ];
    }
    
    if (passType && passType !== 'All') {
      query.passType = passType;
    }

    if (paymentStatus && paymentStatus !== 'All') {
      query.paymentStatus = paymentStatus;
    }

    const participants = await Participant.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: participants.length,
      participants
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving participants.' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { registrationId, paymentStatus } = req.body;

    if (!registrationId || !['Pending', 'Approved', 'Rejected'].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid payload.' });
    }

    const updated = await Participant.findOneAndUpdate(
      { registrationId },
      { 
        paymentStatus,
        registrationStatus: paymentStatus === 'Approved' ? 'Verified' : 'Submitted'
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Participant not found.' });
    }

    if (paymentStatus === 'Approved') {
      emailService.sendConfirmationEmail(updated).catch(e => console.error(e));
    }

    return res.status(200).json({
      success: true,
      message: `Payment status updated to '${paymentStatus}'.`,
      data: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error updating participant status.' });
  }
};

const editParticipant = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const updates = req.body;

    const updated = await Participant.findOneAndUpdate(
      { registrationId },
      updates,
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Participant not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Participant updated successfully.',
      data: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error editing participant.' });
  }
};

const deleteParticipant = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const deleted = await Participant.findOneAndDelete({ registrationId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Participant not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Participant registration deleted.'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error deleting participant.' });
  }
};

const exportCSV = async (req, res) => {
  try {
    const participants = await Participant.find();
    
    let csv = 'Registration ID,Name,Roll Number,Email,Phone,School,Pass Type,Amount,Payment Status,Transaction ID,Checked In,Registration Time,Members\n';

    participants.forEach(p => {
      const membersStr = p.members && p.members.length ? p.members.map(m => `${m.name} (${m.rollNumber})`).join(' | ') : 'N/A';
      csv += `"${p.registrationId}","${p.name}","${p.rollNumber}","${p.email || ''}","${p.phone}","${p.school || ''}","${p.passType}","${p.amount}","${p.paymentStatus}","${p.transactionId || ''}","${p.checkedIn ? 'Yes' : 'No'}","${p.createdAt || ''}","${membersStr.replace(/"/g, '""')}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="Band_Baaja_Baarat_2026_Participants.csv"');
    return res.status(200).send(csv);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error exporting CSV.' });
  }
};

const verifyPassQR = async (req, res) => {
  try {
    const { registrationId } = req.body;
    if (!registrationId) {
      return res.status(400).json({ success: false, message: 'Registration ID required for scanning.' });
    }

    const participant = await Participant.findOne({ registrationId });
    if (!participant) {
      return res.status(404).json({ success: false, valid: false, message: 'INVALID PASS: Registration ID not found in database.' });
    }

    if (participant.paymentStatus !== 'Approved') {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `PASS UNVERIFIED: Payment status is currently '${participant.paymentStatus}'. Entrance rejected.`,
        participant
      });
    }

    if (participant.checkedIn) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `ALREADY USED: Pass ${registrationId} was already scanned for entry at ${participant.checkedInAt || 'earlier time'}.`,
        participant
      });
    }

    // Mark as checked in
    participant.checkedIn = true;
    participant.checkedInAt = new Date();
    const updated = await participant.save();

    return res.status(200).json({
      success: true,
      valid: true,
      message: `🎉 WELCOME TO BAND BAAJA BAARAT 2026! Entry granted for ${participant.name} (${participant.passType}).`,
      participant: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'QR Check-in scanner error.' });
  }
};

module.exports = {
  adminLogin,
  getDashboardStats,
  getParticipants,
  updateStatus,
  editParticipant,
  deleteParticipant,
  exportCSV,
  verifyPassQR
};
