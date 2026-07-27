const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  collectPass,
  getParticipant
} = require('../controllers/volunteerController');

// All volunteer routes require authentication and appropriate roles
router.use(authMiddleware);
router.use(roleMiddleware(['super_admin', 'admin', 'volunteer']));

router.get('/participant/:registrationId', getParticipant);
router.post('/collect-pass', collectPass);

module.exports = router;
