const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  adminLogin,
  getDashboardStats,
  getParticipants,
  updateStatus,
  editParticipant,
  deleteParticipant,
  exportCSV,
  resendApprovalEmail,
  createStaff,
  createComplimentaryPass
} = require('../controllers/adminController');

const rateLimit = require('express-rate-limit');

// Rate Limiter for Login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per `window` (here, per 15 minutes)
  message: { success: false, message: 'Too many login attempts, please try again after 15 minutes' }
});

// Admin Auth Route
router.post('/login', loginLimiter, adminLogin);

// Protected Admin Routes
// We apply authMiddleware to all protected routes
router.use(authMiddleware);

// Only allow super_admin and admin to access dashboard and participant management
const adminOnly = roleMiddleware(['super_admin', 'admin']);

router.get('/dashboard', adminOnly, getDashboardStats);
router.get('/participants', adminOnly, getParticipants);
router.put('/update-status', adminOnly, updateStatus);
router.put('/participant/:registrationId', adminOnly, editParticipant);
// Delete is only for super_admin
router.delete('/participant/:registrationId', roleMiddleware(['super_admin']), deleteParticipant);
router.get('/export-csv', roleMiddleware(['super_admin']), exportCSV);
router.post('/resend-approval-email/:participantId', adminOnly, resendApprovalEmail);
router.post('/staff', adminOnly, createStaff);
router.post('/complimentary-pass', roleMiddleware(['super_admin', 'admin']), createComplimentaryPass);

module.exports = router;
