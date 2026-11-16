const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 2000 },
  propertyType: { type: String, enum: ['apartment', 'house', 'studio', 'pg', 'hostel', 'other'], required: true },
  images: [{ url: String, publicId: String }],
  location: {
    city: { type: String, required: true },
    area: { type: String },
    address: { type: String },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  rent: { type: Number, required: true, min: 0 },
  securityDeposit: { type: Number, min: 0 },
  availableRooms: { type: Number, min: 1, default: 1 },
  totalRooms: { type: Number, min: 1 },
  amenities: [{ type: String }],
  furnishingStatus: { type: String, enum: ['furnished', 'semi-furnished', 'unfurnished'] },
  availableFrom: { type: Date },
  houseRules: [{ type: String }],
  preferredTenantGender: { type: String, enum: ['male', 'female', 'any'], default: 'any' },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true,
});

listingSchema.index({ 'location.city': 1, rent: 1 });
listingSchema.index({ isActive: 1, isVerified: 1 });
listingSchema.index({ owner: 1 });

module.exports = mongoose.model('Listing', listingSchema);
