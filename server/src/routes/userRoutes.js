const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  updateOnboarding,
  completeOnboarding,
  uploadProfilePicture,
  getDashboardStats,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile/update', updateProfile);
router.put('/onboarding', updateOnboarding);
router.put('/onboarding/complete', completeOnboarding);
router.put('/upload-picture', uploadProfilePicture);
router.get('/dashboard', getDashboardStats);

module.exports = router;
