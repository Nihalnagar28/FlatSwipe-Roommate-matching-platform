const User = require('../models/User');
const Match = require('../models/Match');
const Message = require('../models/Message');
const Like = require('../models/Like');
const cloudinary = require('../config/cloudinary');

// @desc    Get current user profile
// @route   GET /api/users/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile/update
exports.updateProfile = async (req, res) => {
  try {
    // Remove fields that shouldn't be updated via this route
    const disallowed = ['password', 'role', 'isActive', 'isEmailVerified', 'isIdVerified', 'verificationBadge', 'subscription'];
    disallowed.forEach((field) => delete req.body[field]);

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update onboarding step data
// @route   PUT /api/users/onboarding
exports.updateOnboarding = async (req, res) => {
  try {
    const { step, data } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Merge step data into user
    Object.keys(data).forEach((key) => {
      user[key] = data[key];
    });

    user.onboardingStep = step + 1;
    user.profileCompletionPercentage = user.calculateProfileCompletion();
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Complete onboarding
// @route   PUT /api/users/onboarding/complete
exports.completeOnboarding = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.onboardingCompleted = true;
    user.profileCompletionPercentage = user.calculateProfileCompletion();
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Upload profile picture
// @route   PUT /api/users/upload-picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: 'Please provide an image' });
    }

    const user = await User.findById(req.user.id);

    // If image is already a URL or cloudinary is not configured, save directly
    if (image.startsWith('http://') || image.startsWith('https://') || !process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY === 'your_api_key') {
      user.profilePicture = image;
      await user.save({ validateBeforeSave: false });
      return res.status(200).json({ success: true, data: user });
    }

    try {
      // Delete old image if exists
      if (user.profilePicturePublicId) {
        await cloudinary.uploader.destroy(user.profilePicturePublicId);
      }

      const result = await cloudinary.uploader.upload(image, {
        folder: 'flatmate/profiles',
        width: 500,
        crop: 'scale',
      });

      user.profilePicture = result.secure_url;
      user.profilePicturePublicId = result.public_id;
    } catch (uploadErr) {
      // Graceful fallback to direct image string if upload fails
      user.profilePicture = image;
    }

    await user.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/users/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const [matchCount, unreadMessages, likesReceived] = await Promise.all([
      Match.countDocuments({ users: userId, isActive: true }),
      Message.countDocuments({ receiver: userId, isRead: false }),
      Like.countDocuments({ toUser: userId, type: { $ne: 'pass' } }),
    ]);

    const profileCompletion = user.calculateProfileCompletion();

    res.status(200).json({
      success: true,
      data: {
        profileCompletion,
        matchCount,
        unreadMessages,
        likesReceived,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
