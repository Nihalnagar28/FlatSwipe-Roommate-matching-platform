const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['email', 'phone', 'government-id'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  documentUrl: { type: String },
  documentPublicId: { type: String },
  rejectionReason: { type: String },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date },
}, { timestamps: true });

verificationSchema.index({ user: 1, type: 1 });

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reportedListing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  reportedMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  reason: { type: String, required: true, enum: ['spam', 'harassment', 'fake-profile', 'inappropriate-content', 'scam', 'other'] },
  description: { type: String, maxlength: 1000 },
  status: { type: String, enum: ['pending', 'reviewed', 'resolved', 'dismissed'], default: 'pending' },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolvedAt: { type: Date },
  resolution: { type: String },
}, { timestamps: true });

reportSchema.index({ status: 1 });

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['premium', 'pro'], required: true },
  status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  features: [{ type: String }],
}, { timestamps: true });

subscriptionSchema.index({ user: 1, status: 1 }, { unique: true });

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['like', 'match', 'message', 'meetup', 'verification', 'system'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String },
  isRead: { type: Boolean, default: false },
  relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  relatedMatch: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
}, { timestamps: true });

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

const Verification = mongoose.model('Verification', verificationSchema);
const Report = mongoose.model('Report', reportSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { Verification, Report, Subscription, Notification };
