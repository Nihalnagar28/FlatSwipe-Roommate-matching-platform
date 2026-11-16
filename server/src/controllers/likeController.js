const Like = require('../models/Like');
const Match = require('../models/Match');
const User = require('../models/User');
const UserPreference = require('../models/UserPreference');
const { Notification } = require('../models/Others');
const { calculateCompatibility } = require('../services/compatibilityService');

// @desc    Like a user
// @route   POST /api/likes/like/:userId
exports.likeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const type = req.body.type || 'like'; // 'like' or 'super-like'

    if (userId === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot like yourself' });
    }

    // Check if already liked
    const existingLike = await Like.findOne({ fromUser: req.user.id, toUser: userId });
    if (existingLike) {
      return res.status(400).json({ success: false, message: 'You have already interacted with this user' });
    }

    // Create the like
    const like = await Like.create({
      fromUser: req.user.id,
      toUser: userId,
      type: type === 'super-like' ? 'super-like' : 'like',
    });

    // Check for mutual like (match)
    const mutualLike = await Like.findOne({
      fromUser: userId,
      toUser: req.user.id,
      type: { $in: ['like', 'super-like'] },
      isActive: true,
    });

    let match = null;
    if (mutualLike) {
      // Calculate compatibility
      const currentUser = await User.findById(req.user.id);
      const matchedUser = await User.findById(userId);
      const prefs1 = await UserPreference.findOne({ user: req.user.id });
      const prefs2 = await UserPreference.findOne({ user: userId });

      const compatibility = calculateCompatibility(currentUser, matchedUser, prefs1, prefs2);

      match = await Match.create({
        users: [req.user.id, userId],
        compatibilityScore: compatibility.score,
        compatibilityBreakdown: compatibility.breakdown,
        compatibilityExplanations: compatibility.explanations,
      });

      // Create notifications for both users
      await Notification.create([
        {
          user: req.user.id,
          type: 'match',
          title: 'New Match!',
          message: `You matched with ${matchedUser.fullName}!`,
          relatedUser: userId,
          relatedMatch: match._id,
        },
        {
          user: userId,
          type: 'match',
          title: 'New Match!',
          message: `You matched with ${currentUser.fullName}!`,
          relatedUser: req.user.id,
          relatedMatch: match._id,
        },
      ]);
    }

    // Create notification for the liked user
    if (!match) {
      await Notification.create({
        user: userId,
        type: 'like',
        title: type === 'super-like' ? 'Someone Super Liked you!' : 'Someone liked you!',
        message: 'Check your likes to see who it is.',
        relatedUser: req.user.id,
      });
    }

    res.status(201).json({
      success: true,
      data: {
        like,
        match: match || null,
        isMatch: !!match,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Pass on a user
// @route   POST /api/likes/pass/:userId
exports.passUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot pass on yourself' });
    }

    const existingLike = await Like.findOne({ fromUser: req.user.id, toUser: userId });
    if (existingLike) {
      return res.status(400).json({ success: false, message: 'You have already interacted with this user' });
    }

    const like = await Like.create({
      fromUser: req.user.id,
      toUser: userId,
      type: 'pass',
    });

    res.status(201).json({ success: true, data: like });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get likes received
// @route   GET /api/likes/received
exports.getLikesReceived = async (req, res) => {
  try {
    const likes = await Like.find({
      toUser: req.user.id,
      type: { $in: ['like', 'super-like'] },
      isActive: true,
    })
      .populate('fromUser', 'fullName profilePicture age occupation currentCity')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: likes, count: likes.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get likes sent
// @route   GET /api/likes/sent
exports.getLikesSent = async (req, res) => {
  try {
    const likes = await Like.find({
      fromUser: req.user.id,
      type: { $in: ['like', 'super-like'] },
      isActive: true,
    })
      .populate('toUser', 'fullName profilePicture age occupation currentCity')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: likes, count: likes.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get super likes received
// @route   GET /api/likes/sent (filtered for super-like) — actually we add a dedicated endpoint
exports.getSuperLikes = async (req, res) => {
  try {
    const likes = await Like.find({
      toUser: req.user.id,
      type: 'super-like',
      isActive: true,
    })
      .populate('fromUser', 'fullName profilePicture age occupation currentCity')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: likes, count: likes.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Reset swipes to re-explore candidates
// @route   POST /api/likes/reset
exports.resetLikes = async (req, res) => {
  try {
    const filter = { fromUser: req.user.id };
    if (req.query.all !== 'true') {
      filter.type = 'pass';
    }
    await Like.deleteMany(filter);
    res.status(200).json({ success: true, message: 'Swipes reset successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
