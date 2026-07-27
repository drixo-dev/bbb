const Participant = require('../models/Participant');

const collectPass = async (req, res) => {
  try {
    const { registrationId } = req.body;
    if (!registrationId) {
      return res.status(400).json({ success: false, message: 'Registration ID required for scanning.' });
    }

    const participant = await Participant.findOneAndUpdate(
      {
        registrationId,
        ticketCollected: false,
        paymentStatus: 'Approved'
      },
      {
        $set: {
          ticketCollected: true,
          collectedAt: new Date(),
          collectedBy: req.admin.id
        }
      },
      { new: true }
    ).populate('collectedBy', 'name');

    if (!participant) {
      // It's possible the participant doesn't exist, is not approved, or already collected.
      // We can fetch just to provide a better error message.
      const existing = await Participant.findOne({ registrationId }).populate('collectedBy', 'name');
      if (!existing) {
        return res.status(404).json({ success: false, valid: false, message: 'Registration not found' });
      }
      if (existing.paymentStatus !== 'Approved') {
        return res.status(400).json({
          success: false,
          valid: false,
          message: 'Do NOT allow collection.',
          participant: { paymentStatus: existing.paymentStatus }
        });
      }
      if (existing.ticketCollected) {
        return res.status(400).json({
          success: false,
          valid: false,
          message: 'Pass already collected',
          participant: {
              collectedAt: existing.collectedAt,
              collectedBy: existing.collectedBy ? existing.collectedBy.name : 'Unknown'
          }
        });
      }
    }

    console.log(`[AUDIT] Pass Collected - Registration: ${registrationId} | By Admin ID: ${req.admin.id} | Time: ${new Date().toISOString()}`);

    return res.status(200).json({
      success: true,
      valid: true,
      message: 'Pass successfully collected.',
      participant: {
          name: participant.name,
          rollNumber: participant.rollNumber,
          email: participant.email,
          phone: participant.phone,
          school: participant.school,
          members: participant.members,
          registrationId: participant.registrationId,
          passType: participant.passType,
          paymentStatus: participant.paymentStatus,
          ticketCollected: participant.ticketCollected,
          collectedAt: participant.collectedAt,
          collectedBy: participant.collectedBy ? participant.collectedBy.name : 'Unknown'
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error collecting pass.' });
  }
};

const getParticipant = async (req, res) => {
  try {
    const { registrationId } = req.params; // Using this param as a generic identifier
    
    const participant = await Participant.findOne({
      $or: [
        { registrationId: registrationId },
        { email: registrationId },
        { rollNumber: registrationId }
      ]
    }).populate('collectedBy', 'name');
      
    if (!participant) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    
    return res.status(200).json({
        success: true, 
        participant: {
            name: participant.name,
            rollNumber: participant.rollNumber,
            email: participant.email,
            phone: participant.phone,
            school: participant.school,
            members: participant.members,
            registrationId: participant.registrationId,
            passType: participant.passType,
            paymentStatus: participant.paymentStatus,
            ticketCollected: participant.ticketCollected,
            collectedAt: participant.collectedAt,
            collectedBy: participant.collectedBy ? participant.collectedBy.name : 'Unknown'
        }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error fetching participant' });
  }
};

module.exports = {
  collectPass,
  getParticipant
};
