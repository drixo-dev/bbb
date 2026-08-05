const Participant = require('../models/Participant');
const crypto = require('crypto');

const PASS_PRICES = {
  'Single Pass': 950,
  'Couple Pass': 899,
  'Group Pass (4 People)': 1599
};

const getNextAction = (status) => {
  if (status === 'Not Submitted') return 'CONTINUE_PAYMENT';
  if (status === 'Pending Verification') return 'VIEW_STATUS';
  if (status === 'Approved') return 'VIEW_PASS';
  if (status === 'Rejected') return 'REUPLOAD_PAYMENT';
  return 'CONTINUE_PAYMENT';
};

const registerParticipant = async (req, res) => {
  try {
    const { name, rollNumber, email, phone, school, passType, members } = req.body;

    if (!name || !rollNumber || !phone || !school || !passType) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    const cleanRollNumber = rollNumber.trim().toUpperCase();

    const cleanEmail = (email || '').trim().toLowerCase();

    // Check for existing registration
    const existing = await Participant.findOne({ rollNumber: cleanRollNumber });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A registration already exists for this Roll Number. Please use "Find My Registration" to access it.'
      });
    }

    // Pass type validation for new registration
    let expectedMembersCount = 0;
    if (passType === 'Couple Pass') expectedMembersCount = 1;
    if (passType === 'Group Pass (4 People)') expectedMembersCount = 3;

    const memberList = Array.isArray(members) ? members : [];
    if (memberList.length < expectedMembersCount) {
      return res.status(400).json({
        success: false,
        message: `Pass type '${passType}' requires details for ${expectedMembersCount} additional member(s).`
      });
    }

    const price = PASS_PRICES[passType] || 950;
    const registrationId = 'BBB26-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const newParticipant = new Participant({
      registrationId,
      name: name.trim(),
      rollNumber: cleanRollNumber,
      email: (email || '').trim().toLowerCase(),
      phone: phone.trim(),
      school: school.trim(),
      passType,
      amount: price,
      members: memberList,
      paymentStatus: 'Not Submitted'
    });

    await newParticipant.save();

    return res.status(201).json({
      success: true,
      message: 'Registration initiated successfully.',
      data: newParticipant,
      nextAction: 'CONTINUE_PAYMENT'
    });
  } catch (error) {
    console.error('Error in registerParticipant:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

const resumeRegistration = async (req, res) => {
  try {
    const { rollNumber } = req.body;

    if (!rollNumber) {
      return res.status(400).json({ success: false, message: 'Roll Number is required.' });
    }

    const cleanRollNumber = rollNumber.trim().toUpperCase();

    const existing = await Participant.findOne({ rollNumber: cleanRollNumber });
    if (!existing) {
      return res.status(200).json({ success: true, nextAction: 'NOT_FOUND', message: 'Registration not found for this Roll Number.' });
    }

    return res.status(200).json({
      success: true,
      registrationId: existing.registrationId,
      participantName: existing.name,
      nextAction: getNextAction(existing.paymentStatus),
      message: 'Registration retrieved successfully.'
    });

  } catch (error) {
    console.error('Error in resumeRegistration:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving registration.' });
  }
};

const editRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { name, email, phone, passType, members, school } = req.body;

    const participant = await Participant.findOne({ registrationId });
    if (!participant) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    if (participant.paymentStatus !== 'Not Submitted') {
      return res.status(400).json({ success: false, message: 'Registration cannot be edited after payment is submitted.' });
    }

    let expectedMembersCount = 0;
    if (passType === 'Couple Pass') expectedMembersCount = 1;
    if (passType === 'Group Pass (4 People)') expectedMembersCount = 3;

    const memberList = Array.isArray(members) ? members : [];
    if (memberList.length < expectedMembersCount) {
      return res.status(400).json({
        success: false,
        message: `Pass type '${passType}' requires details for ${expectedMembersCount} additional member(s).`
      });
    }

    const activeMembers = memberList.slice(0, expectedMembersCount);
    const price = PASS_PRICES[passType] || 950;

    const newRollNumber = req.body.rollNumber ? req.body.rollNumber.trim().toUpperCase() : participant.rollNumber;
    const newEmail = email ? email.trim().toLowerCase() : participant.email;
    const newPhone = phone ? phone.trim() : participant.phone;

    if (newRollNumber !== participant.rollNumber) {
      const rollExist = await Participant.findOne({ rollNumber: newRollNumber });
      if (rollExist) return res.status(400).json({ success: false, message: 'This Roll Number is already registered.' });
    }

    participant.name = name ? name.trim() : participant.name;
    participant.rollNumber = newRollNumber;
    participant.email = newEmail;
    participant.phone = newPhone;
    participant.school = school ? school.trim() : participant.school;
    participant.passType = passType;
    participant.members = activeMembers;
    participant.amount = price;

    await participant.save();

    return res.status(200).json({
      success: true,
      message: 'Registration updated successfully.',
      data: participant
    });
  } catch (error) {
    console.error('Error in editRegistration:', error);
    return res.status(500).json({ success: false, message: 'Server error updating registration.' });
  }
};

const verifyIdentity = async (req, res) => {
  try {
    const { registrationId, identityValue } = req.body;
    if (!registrationId || !identityValue) {
      return res.status(400).json({ success: false, message: 'Registration ID and identity value are required.' });
    }

    const participant = await Participant.findOne({ registrationId });
    if (!participant) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    const val = identityValue.trim().toLowerCase();
    
    const idMatch = participant.registrationId.toLowerCase() === val;
    const emailMatch = participant.email.toLowerCase() === val;
    const phoneMatch = participant.phone.trim() === identityValue.trim();

    if (idMatch || emailMatch || phoneMatch) {
      return res.status(200).json({ success: true, message: 'Identity verified.' });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Verification failed.\n\nPlease enter your Registration ID, registered email, or registered phone number.' 
      });
    }
  } catch (error) {
    console.error('Error in verifyIdentity:', error);
    return res.status(500).json({ success: false, message: 'Server error during verification.' });
  }
};

module.exports = { registerParticipant, resumeRegistration, editRegistration, verifyIdentity };
