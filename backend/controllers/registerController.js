const storage = require('../utils/storage');

const PASS_PRICES = {
  'Single Pass': 499,
  'Couple Pass': 899,
  'Group Pass (4 People)': 1599
};

const registerParticipant = async (req, res) => {
  try {
    const { name, rollNumber, email, phone, school, passType, members } = req.body;

    if (!name || !rollNumber || !phone || !school || !passType) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    // Pass type validation
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

    const price = PASS_PRICES[passType] || 499;
    const registrationId = 'BBB26-' + Math.floor(100000 + Math.random() * 900000);

    const newParticipant = {
      registrationId,
      name: name.trim(),
      rollNumber: rollNumber.trim().toUpperCase(),
      email: (email || '').trim().toLowerCase(),
      phone: phone.trim(),
      school: school.trim(),
      passType,
      amount: price,
      members: memberList,
      transactionId: '',
      screenshotUrl: '',
      driveScreenshotUrl: '',
      paymentStatus: 'Pending',
      registrationStatus: 'Submitted',
      checkedIn: false,
      checkedInAt: null,
      createdAt: new Date().toISOString()
    };

    storage.addParticipant(newParticipant);

    return res.status(201).json({
      success: true,
      message: 'Registration initiated successfully.',
      data: newParticipant
    });
  } catch (error) {
    console.error('Error in registerParticipant:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

module.exports = { registerParticipant };
