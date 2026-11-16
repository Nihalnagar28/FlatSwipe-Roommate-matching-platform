const User = require('../models/User');
const Like = require('../models/Like');
const UserPreference = require('../models/UserPreference');
const { calculateCompatibility } = require('../services/compatibilityService');

// @desc    Get discover profiles with compatibility scores
// @route   GET /api/discovery
exports.getDiscoverProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const currentUser = await User.findById(req.user.id);

    // Get IDs the current user has already interacted with
    const existingLikes = await Like.find({ fromUser: req.user.id }).select('toUser');
    const excludeIds = existingLikes.map((like) => like.toUser);

    // Also exclude self and blocked users
    excludeIds.push(req.user.id);
    if (currentUser.blockedUsers && currentUser.blockedUsers.length > 0) {
      excludeIds.push(...currentUser.blockedUsers);
    }

    // Find eligible candidates
    const candidates = await User.find({
      _id: { $nin: excludeIds },
      isActive: true,
      onboardingCompleted: true,
    });

    // Get current user preferences
    const userPrefs = await UserPreference.findOne({ user: req.user.id });

    // Calculate compatibility for each candidate
    const profilesWithScores = await Promise.all(
      candidates.map(async (candidate) => {
        const candidatePrefs = await UserPreference.findOne({ user: candidate._id });
        const compatibility = calculateCompatibility(
          currentUser,
          candidate,
          userPrefs,
          candidatePrefs
        );
        return {
          user: candidate,
          compatibility,
        };
      })
    );

    // Sort by compatibility score (highest first)
    profilesWithScores.sort((a, b) => b.compatibility.score - a.compatibility.score);

    // Apply pagination
    const total = profilesWithScores.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = profilesWithScores.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
