const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getUsers,
  updateUserStatus,
  getReports,
  resolveReport,
  getVerifications,
  approveVerification,
  rejectVerification,
  getListings,
  toggleListingVerification,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);
router.get('/reports', getReports);
router.put('/reports/:id', resolveReport);
router.get('/verifications', getVerifications);
router.put('/verifications/:id/approve', approveVerification);
router.put('/verifications/:id/reject', rejectVerification);
router.get('/listings', getListings);
router.put('/listings/:id/verify', toggleListingVerification);

module.exports = router;
