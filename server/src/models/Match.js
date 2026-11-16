const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  compatibilityScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  compatibilityBreakdown: {
    budget: { type: Number, default: 0 },
    location: { type: Number, default: 0 },
    sleepSchedule: { type: Number, default: 0 },
    cleanliness: { type: Number, default: 0 },
    smokingDrinking: { type: Number, default: 0 },
    socialParty: { type: Number, default: 0 },
    petsGuests: { type: Number, default: 0 },
    personality: { type: Number, default: 0 },
  },
  compatibilityExplanations: [{ type: String }],
  isActive: {
    type: Boolean,
    default: true,
  },
  unmatchedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  unmatchedAt: Date,
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  lastMessageAt: Date,
}, {
  timestamps: true,
});

matchSchema.index({ users: 1 });
matchSchema.index({ isActive: 1 });

module.exports = mongoose.model('Match', matchSchema);
