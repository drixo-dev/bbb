const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  adminLogin,
  getDashboardStats,
  getParticipants,
  updateStatus,
  editParticipant,
  deleteParticipant,
  exportCSV,
  verifyPassQR
} = require('../controllers/adminController');

// Admin Auth Route
router.post('/login', adminLogin);

// Protected Admin Routes
router.get('/dashboard', authMiddleware, getDashboardStats);
router.get('/participants', authMiddleware, getParticipants);
router.put('/update-status', authMiddleware, updateStatus);
router.put('/participant/:registrationId', authMiddleware, editParticipant);
router.delete('/participant/:registrationId', authMiddleware, deleteParticipant);
router.get('/export-csv', authMiddleware, exportCSV);
router.post('/verify-pass', authMiddleware, verifyPassQR);

module.exports = router;
