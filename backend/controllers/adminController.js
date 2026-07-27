const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Participant = require('../models/Participant');
const Admin = require('../models/Admin');
const emailService = require('../services/emailService');

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    let admin = await Admin.findOne({ email: username.toLowerCase() });
    
    // Seed default admin if missing
    if (!admin) {
      const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      if (username === defaultUsername && (password === defaultPassword || password === 'admin123')) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultPassword, salt);
        admin = await Admin.create({
          name: 'Super Admin',
          email: defaultUsername.toLowerCase(),
          password: hashedPassword,
          role: 'super_admin'
        });
      }
    }
    
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }
    
    if (!admin.isActive) {
      return res.status(403).json({ success: false, message: 'Admin account disabled.' });
    }
    
    admin.lastLogin = new Date();
    await admin.save();
    
    const token = jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email },
      process.env.JWT_SECRET || 'royal_band_baaja_baarat_2026_super_secret_key_98765',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token,
      role: admin.role,
      message: 'Admin authentication successful.'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Admin login server error.' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalRegistrations = await Participant.countDocuments({ isDeleted: { $ne: true } });
    const pendingPayments = await Participant.countDocuments({ paymentStatus: 'Pending Verification', isDeleted: { $ne: true } });
    const approvedPayments = await Participant.countDocuments({ paymentStatus: 'Approved', isDeleted: { $ne: true } });
    const rejectedPayments = await Participant.countDocuments({ paymentStatus: 'Rejected', isDeleted: { $ne: true } });
    const checkedInCount = await Participant.countDocuments({ ticketCollected: true, isDeleted: { $ne: true } });
    
    const approvedList = await Participant.find({ paymentStatus: 'Approved', isDeleted: { $ne: true } });
    const totalRevenue = approvedList.reduce((sum, p) => sum + (p.amount || 0), 0);

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
    
    let query = { isDeleted: { $ne: true } };
    if (search && search.trim()) {
      const q = new RegExp(search.trim(), 'i');
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
    const { registrationId, paymentStatus, rejectionReason } = req.body;

    if (!registrationId || !['Pending Verification', 'Approved', 'Rejected'].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid payload.' });
    }

    const updateFields = { 
        paymentStatus,
        registrationStatus: paymentStatus === 'Approved' ? 'Verified' : 'Submitted'
    };
    
    if (paymentStatus === 'Rejected') {
      if (rejectionReason) updateFields.rejectionReason = rejectionReason.trim();
      updateFields.checkedIn = false;
      updateFields.checkedInAt = null;
      if (req.admin && req.admin.id) {
          updateFields.rejectedBy = req.admin.id;
          updateFields.rejectedAt = new Date();
      }
    } else if (paymentStatus === 'Approved') {
      updateFields.rejectionReason = ''; // clear it on approval
      if (req.admin && req.admin.id) {
          updateFields.approvedBy = req.admin.id;
          updateFields.approvedAt = new Date();
      }
    } else if (paymentStatus === 'Pending Verification') {
      updateFields.checkedIn = false;
      updateFields.checkedInAt = null;
    }

    const updated = await Participant.findOneAndUpdate(
      { registrationId },
      updateFields,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Participant not found.' });
    }

    let emailStatus = null;
    if (paymentStatus === 'Approved') {
      console.log(`[AUDIT] Payment Approved - Registration: ${registrationId} | By: ${req.admin ? req.admin.id : 'System'} | Time: ${new Date().toISOString()}`);
      emailStatus = await emailService.sendApprovalEmail(updated);
      
      if (emailStatus && emailStatus.success) {
        updated.approvalEmailSent = true;
        updated.approvalEmailSentAt = new Date();
        await updated.save();
      }
    } else if (paymentStatus === 'Rejected') {
      console.log(`[AUDIT] Payment Rejected - Registration: ${registrationId} | Reason: ${rejectionReason} | By: ${req.admin ? req.admin.id : 'System'} | Time: ${new Date().toISOString()}`);
      await emailService.sendRejectionEmail(updated);
    }

    if (paymentStatus === 'Approved' && emailStatus && !emailStatus.success) {
      updated.approvalEmailSent = false;
      await updated.save();
      return res.status(200).json({
        success: true,
        emailSent: false,
        message: "Participant approved but the approval email could not be sent.",
        data: updated
      });
    }

    return res.status(200).json({
      success: true,
      emailSent: paymentStatus === 'Approved' ? true : undefined,
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
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ success: false, message: `This ${field} is already in use by another participant.` });
    }
    return res.status(500).json({ success: false, message: 'Error editing participant.' });
  }
};

const deleteParticipant = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const deleted = await Participant.findOneAndUpdate(
      { registrationId },
      { $set: { isDeleted: true } },
      { new: true }
    );

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
    const participants = await Participant.find({ isDeleted: { $ne: true } }).populate('collectedBy', 'name');
    
    let csv = 'Registration ID,Name,Roll Number,Email,Phone,School,Pass Type,Amount,Payment Status,Transaction ID,Checked In,Registration Time,Collected By,Collected At,Members\n';

    participants.forEach(p => {
      const membersStr = p.members && p.members.length ? p.members.map(m => `${m.name} (${m.rollNumber})`).join(' | ') : 'N/A';
      const collectedByStr = p.collectedBy ? p.collectedBy.name : (p.ticketCollected ? 'Unknown' : 'N/A');
      const collectedAtStr = p.collectedAt ? p.collectedAt.toISOString() : 'N/A';
      csv += `"${p.registrationId}","${p.name}","${p.rollNumber}","${p.email || ''}","${p.phone}","${p.school || ''}","${p.passType}","${p.amount}","${p.paymentStatus}","${p.transactionId || ''}","${p.checkedIn ? 'Yes' : 'No'}","${p.createdAt || ''}","${collectedByStr}","${collectedAtStr}","${membersStr.replace(/"/g, '""')}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="Band_Baaja_Baarat_2026_Participants.csv"');
    return res.status(200).send(csv);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error exporting CSV.' });
  }
};

const resendApprovalEmail = async (req, res) => {
  try {
    const { participantId } = req.params;
    
    // We can search by registrationId since it acts as the primary identifier on frontend,
    // or by _id. Let's assume registrationId based on param name 'participantId' conventionally used above.
    const participant = await Participant.findOne({ registrationId: participantId });
    
    if (!participant) {
      return res.status(404).json({ success: false, message: 'Participant not found.' });
    }

    if (participant.paymentStatus !== 'Approved') {
      return res.status(400).json({ success: false, message: 'Participant is not approved.' });
    }

    const emailStatus = await emailService.sendApprovalEmail(participant);
    
    if (!emailStatus.success) {
      participant.approvalEmailSent = false;
      await participant.save();
      return res.status(200).json({
        success: true,
        emailSent: false,
        message: "Participant approved but the approval email could not be sent."
      });
    }

    participant.approvalEmailSent = true;
    participant.approvalEmailSentAt = new Date();
    await participant.save();

    return res.status(200).json({
      success: true,
      emailSent: true,
      message: 'Approval email resent successfully.'
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error resending email.' });
  }
};

const createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!['super_admin', 'admin', 'volunteer'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role.' });
    }

    if (req.admin.role !== 'super_admin' && role === 'super_admin') {
      return res.status(403).json({ success: false, message: 'Only Super Admins can create other Super Admins.' });
    }

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email/username already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role
    });

    return res.status(201).json({
      success: true,
      message: 'Staff account created successfully.'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error creating staff account.' });
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
  resendApprovalEmail,
  createStaff
};
