const User = require('../models/User');
const Match = require('../models/Match');
const Message = require('../models/Message');
const Listing = require('../models/Listing');
const { Verification, Report, Notification } = require('../models/Others');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalMatches, totalMessages, totalListings, pendingVerifications, pendingReports] =
      await Promise.all([
        User.countDocuments(),
        Match.countDocuments(),
        Message.countDocuments(),
        Listing.countDocuments(),
        Verification.countDocuments({ status: 'pending' }),
        Report.countDocuments({ status: 'pending' }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalMatches,
        totalMessages,
        totalListings,
        pendingVerifications,
        pendingReports,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all users (paginated)
// @route   GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: users,
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

// @desc    Update user status (activate/deactivate)
// @route   PUT /api/admin/users/:id/status
exports.updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all reports
// @route   GET /api/admin/reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reporter', 'fullName email')
      .populate('reportedUser', 'fullName email')
      .populate('reportedListing', 'title')
      .populate('resolvedBy', 'fullName')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reports, count: reports.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Resolve a report
// @route   PUT /api/admin/reports/:id
exports.resolveReport = async (req, res) => {
  try {
    const { status, resolution } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        status: status || 'resolved',
        resolution,
        resolvedBy: req.user.id,
        resolvedAt: new Date(),
      },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all verifications
// @route   GET /api/admin/verifications
exports.getVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find()
      .populate('user', 'fullName email profilePicture')
      .populate('reviewedBy', 'fullName')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: verifications, count: verifications.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Approve verification
// @route   PUT /api/admin/verifications/:id/approve
exports.approveVerification = async (req, res) => {
  try {
    const verification = await Verification.findById(req.params.id);

    if (!verification) {
      return res.status(404).json({ success: false, message: 'Verification not found' });
    }

    verification.status = 'approved';
    verification.reviewedBy = req.user.id;
    verification.reviewedAt = new Date();
    await verification.save();

    // Update user verification status
    const updateFields = {};
    if (verification.type === 'government-id') {
      updateFields.isIdVerified = true;
      updateFields.verificationBadge = true;
    } else if (verification.type === 'email') {
      updateFields.isEmailVerified = true;
    } else if (verification.type === 'phone') {
      updateFields.isPhoneVerified = true;
    }

    await User.findByIdAndUpdate(verification.user, updateFields);

    // Notify user
    await Notification.create({
      user: verification.user,
      type: 'verification',
      title: 'Verification Approved',
      message: `Your ${verification.type} verification has been approved!`,
    });

    res.status(200).json({ success: true, data: verification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Reject verification
// @route   PUT /api/admin/verifications/:id/reject
exports.rejectVerification = async (req, res) => {
  try {
    const verification = await Verification.findById(req.params.id);

    if (!verification) {
      return res.status(404).json({ success: false, message: 'Verification not found' });
    }

    verification.status = 'rejected';
    verification.rejectionReason = req.body.reason || 'Document not acceptable';
    verification.reviewedBy = req.user.id;
    verification.reviewedAt = new Date();
    await verification.save();

    // Notify user
    await Notification.create({
      user: verification.user,
      type: 'verification',
      title: 'Verification Rejected',
      message: `Your ${verification.type} verification was rejected: ${verification.rejectionReason}`,
    });

    res.status(200).json({ success: true, data: verification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all listings (admin view)
// @route   GET /api/admin/listings
exports.getListings = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const total = await Listing.countDocuments();
    const listings = await Listing.find()
      .populate('owner', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: listings,
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

// @desc    Toggle listing verification
// @route   PUT /api/admin/listings/:id/verify
exports.toggleListingVerification = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    listing.isVerified = !listing.isVerified;
    await listing.save();

    res.status(200).json({ success: true, data: listing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
