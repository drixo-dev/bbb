const express = require('express');
const router = express.Router();
const { registerParticipant, resumeRegistration, editRegistration } = require('../controllers/registerController');
const { submitPayment } = require('../controllers/paymentController');
const { getPassById } = require('../controllers/passController');
const upload = require('../middleware/uploadMiddleware');
const rateLimit = require('express-rate-limit');

const publicApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' }
});

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 registrations/payments per hour
  message: { success: false, message: 'Too many submissions from this IP, please try again after an hour' }
});

// Public APIs
router.use(publicApiLimiter);
router.post('/register', submitLimiter, registerParticipant);
router.post('/resume-registration', submitLimiter, resumeRegistration);
router.put('/registration/:registrationId', submitLimiter, editRegistration);
router.post('/payment', upload.single('screenshot'), submitLimiter, submitPayment);
router.get('/pass/:id', getPassById);

module.exports = router;
