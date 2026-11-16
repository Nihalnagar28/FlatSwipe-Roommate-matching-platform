const { Verification } = require('../models/Others');

// @desc    Request verification
// @route   POST /api/verification/request
exports.requestVerification = async (req, res) => {
  try {
    const { type, documentUrl, documentPublicId } = req.body;

    // Check for existing pending verification of same type
    const existing = await Verification.findOne({
      user: req.user.id,
      type,
      status: 'pending',
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'You already have a pending verification request for this type' });
    }

    const verification = await Verification.create({
      user: req.user.id,
      type,
      documentUrl,
      documentPublicId,
    });

    res.status(201).json({ success: true, data: verification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get verification status
// @route   GET /api/verification/status
exports.getVerificationStatus = async (req, res) => {
  try {
    const verifications = await Verification.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: verifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
