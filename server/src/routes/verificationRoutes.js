const express = require('express');
const router = express.Router();
const {
  requestVerification,
  getVerificationStatus,
} = require('../controllers/verificationController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/request', requestVerification);
router.get('/status', getVerificationStatus);

module.exports = router;
