const Listing = require('../models/Listing');

// @desc    Create a listing
// @route   POST /api/listings
exports.createListing = async (req, res) => {
  try {
    req.body.owner = req.user.id;
    const listing = await Listing.create(req.body);

    res.status(201).json({ success: true, data: listing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all listings (with filters)
// @route   GET /api/listings
exports.getListings = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = { isActive: true };

    if (req.query.city) {
      query['location.city'] = { $regex: req.query.city, $options: 'i' };
    }
    if (req.query.minRent) {
      query.rent = { ...query.rent, $gte: parseInt(req.query.minRent, 10) };
    }
    if (req.query.maxRent) {
      query.rent = { ...query.rent, $lte: parseInt(req.query.maxRent, 10) };
    }
    if (req.query.furnishing) {
      query.furnishingStatus = req.query.furnishing;
    }
    if (req.query.propertyType) {
      query.propertyType = req.query.propertyType;
    }

    const total = await Listing.countDocuments(query);
    const listings = await Listing.find(query)
      .populate('owner', 'fullName profilePicture')
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

// @desc    Get single listing (increment views)
// @route   GET /api/listings/:id
exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('owner', 'fullName profilePicture age occupation currentCity');

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    res.status(200).json({ success: true, data: listing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
exports.updateListing = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    if (listing.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this listing' });
    }

    listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: listing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    if (listing.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this listing' });
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Toggle save a listing
// @route   PUT /api/listings/save/:id
exports.saveListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    const savedIndex = listing.savedBy.indexOf(req.user.id);

    if (savedIndex > -1) {
      listing.savedBy.splice(savedIndex, 1);
      await listing.save();
      return res.status(200).json({ success: true, message: 'Listing unsaved', data: { saved: false } });
    }

    listing.savedBy.push(req.user.id);
    await listing.save();

    res.status(200).json({ success: true, message: 'Listing saved', data: { saved: true } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get my saved listings
// @route   GET /api/listings/saved/me
exports.getMySavedListings = async (req, res) => {
  try {
    const listings = await Listing.find({ savedBy: req.user.id, isActive: true })
      .populate('owner', 'fullName profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: listings, count: listings.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get my listings
// @route   GET /api/listings/my/listings
exports.getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: listings, count: listings.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
