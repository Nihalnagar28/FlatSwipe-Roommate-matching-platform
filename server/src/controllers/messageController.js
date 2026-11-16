const Message = require('../models/Message');
const Match = require('../models/Match');

// @desc    Get messages for a match
// @route   GET /api/messages/:matchId
exports.getMessages = async (req, res) => {
  try {
    const { matchId } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;
    const skip = (page - 1) * limit;

    // Verify match exists and user is part of it
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    const isParticipant = match.users.some(
      (u) => u.toString() === req.user.id
    );
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const total = await Message.countDocuments({ match: matchId });
    const messages = await Message.find({ match: matchId })
      .populate('sender', 'fullName profilePicture')
      .populate('receiver', 'fullName profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Mark received messages as read
    await Message.updateMany(
      { match: matchId, receiver: req.user.id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.status(200).json({
      success: true,
      data: messages,
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

// @desc    Send a message
// @route   POST /api/messages/:matchId
exports.sendMessage = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { content, messageType } = req.body;

    // Verify match exists and is active
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    if (!match.isActive) {
      return res.status(400).json({ success: false, message: 'This match is no longer active' });
    }

    const isParticipant = match.users.some(
      (u) => u.toString() === req.user.id
    );
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Determine receiver
    const receiverId = match.users.find(
      (u) => u.toString() !== req.user.id
    );

    const message = await Message.create({
      match: matchId,
      sender: req.user.id,
      receiver: receiverId,
      content,
      messageType: messageType || 'text',
    });

    // Update match with last message info
    match.lastMessage = message._id;
    match.lastMessageAt = message.createdAt;
    await match.save();

    const populated = await Message.findById(message._id)
      .populate('sender', 'fullName profilePicture')
      .populate('receiver', 'fullName profilePicture');

    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Mark messages as read
// @route   PUT /api/messages/read/:matchId
exports.markAsRead = async (req, res) => {
  try {
    const { matchId } = req.params;

    await Message.updateMany(
      { match: matchId, receiver: req.user.id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.status(200).json({ success: true, message: 'Messages marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get unread message count
// @route   GET /api/messages/unread/count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      receiver: req.user.id,
      isRead: false,
    });

    res.status(200).json({ success: true, data: { count } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
