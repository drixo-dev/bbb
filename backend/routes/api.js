const express = require('express');
const router = express.Router();
const { registerParticipant } = require('../controllers/registerController');
const { submitPayment } = require('../controllers/paymentController');
const { getPassById } = require('../controllers/passController');
const upload = require('../middleware/uploadMiddleware');

// Public APIs
router.post('/register', registerParticipant);
router.post('/payment', upload.single('screenshot'), submitPayment);
router.get('/pass/:id', getPassById);

module.exports = router;
