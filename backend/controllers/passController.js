const Participant = require('../models/Participant');

const getPassById = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findOne({ registrationId: id });

    if (!participant) {
      return res.status(404).json({ success: false, message: 'Pass / Registration record not found.' });
    }

    return res.status(200).json({
      success: true,
      participant
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error retrieving E-Pass.' });
  }
};

module.exports = { getPassById };
