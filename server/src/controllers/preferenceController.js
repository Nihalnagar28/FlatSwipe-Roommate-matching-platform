const UserPreference = require('../models/UserPreference');

// @desc    Get user preferences
// @route   GET /api/preferences
exports.getPreferences = async (req, res) => {
  try {
    let preferences = await UserPreference.findOne({ user: req.user.id });

    if (!preferences) {
      preferences = await UserPreference.create({ user: req.user.id });
    }

    res.status(200).json({ success: true, data: preferences });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update user preferences
// @route   PUT /api/preferences
exports.updatePreferences = async (req, res) => {
  try {
    const preferences = await UserPreference.findOneAndUpdate(
      { user: req.user.id },
      { ...req.body, user: req.user.id },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: preferences });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
