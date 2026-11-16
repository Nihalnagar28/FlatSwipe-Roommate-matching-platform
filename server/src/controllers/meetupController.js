const Meetup = require('../models/Meetup');
const Match = require('../models/Match');
const { Notification } = require('../models/Others');

// @desc    Create a meetup
// @route   POST /api/meetups
exports.createMeetup = async (req, res) => {
  try {
    const { matchId, proposedDate, proposedTime, location, locationDetails, message } = req.body;

    // Verify match exists and is active
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    if (!match.isActive) {
      return res.status(400).json({ success: false, message: 'Match is no longer active' });
    }

    const isParticipant = match.users.some(
      (u) => u.toString() === req.user.id
    );
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const requestedTo = match.users.find(
      (u) => u.toString() !== req.user.id
    );

    const meetup = await Meetup.create({
      match: matchId,
      requestedBy: req.user.id,
      requestedTo,
      proposedDate,
      proposedTime,
      location,
      locationDetails,
      message,
    });

    // Notify the other user
    await Notification.create({
      user: requestedTo,
      type: 'meetup',
      title: 'Meetup Request',
      message: `You received a meetup request for ${location}`,
      relatedUser: req.user.id,
      relatedMatch: matchId,
    });

    res.status(201).json({ success: true, data: meetup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Respond to a meetup (accept/decline)
// @route   PUT /api/meetups/:meetupId/respond
exports.respondToMeetup = async (req, res) => {
  try {
    const { status } = req.body; // 'accepted' or 'declined'

    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be accepted or declined' });
    }

    const meetup = await Meetup.findById(req.params.meetupId);
    if (!meetup) {
      return res.status(404).json({ success: false, message: 'Meetup not found' });
    }

    if (meetup.requestedTo.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only the invited user can respond' });
    }

    if (meetup.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Meetup has already been responded to' });
    }

    meetup.status = status;
    await meetup.save();

    // Notify the requester
    await Notification.create({
      user: meetup.requestedBy,
      type: 'meetup',
      title: `Meetup ${status}`,
      message: `Your meetup request was ${status}`,
      relatedUser: req.user.id,
      relatedMatch: meetup.match,
    });

    res.status(200).json({ success: true, data: meetup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get meetups for a match
// @route   GET /api/meetups/match/:matchId
exports.getMeetups = async (req, res) => {
  try {
    const meetups = await Meetup.find({ match: req.params.matchId })
      .populate('requestedBy', 'fullName profilePicture')
      .populate('requestedTo', 'fullName profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: meetups, count: meetups.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update meetup checklist
// @route   PUT /api/meetups/:meetupId/checklist
exports.updateChecklist = async (req, res) => {
  try {
    const meetup = await Meetup.findById(req.params.meetupId);
    if (!meetup) {
      return res.status(404).json({ success: false, message: 'Meetup not found' });
    }

    const isParticipant =
      meetup.requestedBy.toString() === req.user.id ||
      meetup.requestedTo.toString() === req.user.id;

    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    meetup.checklist = { ...meetup.checklist.toObject(), ...req.body.checklist };
    if (req.body.notes !== undefined) {
      meetup.notes = req.body.notes;
    }
    await meetup.save();

    res.status(200).json({ success: true, data: meetup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Cancel meetup
// @route   PUT /api/meetups/:meetupId/cancel
exports.cancelMeetup = async (req, res) => {
  try {
    const meetup = await Meetup.findById(req.params.meetupId);
    if (!meetup) {
      return res.status(404).json({ success: false, message: 'Meetup not found' });
    }

    const isParticipant =
      meetup.requestedBy.toString() === req.user.id ||
      meetup.requestedTo.toString() === req.user.id;

    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (meetup.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Meetup is already cancelled' });
    }

    meetup.status = 'cancelled';
    await meetup.save();

    // Notify the other party
    const otherUser =
      meetup.requestedBy.toString() === req.user.id
        ? meetup.requestedTo
        : meetup.requestedBy;

    await Notification.create({
      user: otherUser,
      type: 'meetup',
      title: 'Meetup Cancelled',
      message: 'A meetup was cancelled',
      relatedUser: req.user.id,
      relatedMatch: meetup.match,
    });

    res.status(200).json({ success: true, message: 'Meetup cancelled' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
