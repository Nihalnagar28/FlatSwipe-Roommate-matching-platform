const Match = require('../models/Match');

// @desc    Get all matches for current user
// @route   GET /api/matches
exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      users: req.user.id,
      isActive: true,
    })
      .populate('users', 'fullName profilePicture age occupation currentCity isOnline lastActive')
      .populate('lastMessage')
      .sort({ lastMessageAt: -1, createdAt: -1 });

    res.status(200).json({ success: true, data: matches, count: matches.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single match
// @route   GET /api/matches/:matchId
exports.getMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId)
      .populate('users', 'fullName profilePicture age occupation currentCity bio gender isOnline lastActive personalityType cleanlinessLevel smokingHabit drinkingHabit chronotype environmentPreference');

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    // Verify the user is part of this match
    const isParticipant = match.users.some(
      (u) => u._id.toString() === req.user.id
    );
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this match' });
    }

    res.status(200).json({ success: true, data: match });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Unmatch
// @route   PUT /api/matches/unmatch/:matchId
exports.unmatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    const isParticipant = match.users.some(
      (u) => u.toString() === req.user.id
    );
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    match.isActive = false;
    match.unmatchedBy = req.user.id;
    match.unmatchedAt = new Date();
    await match.save();

    res.status(200).json({ success: true, message: 'Unmatched successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
