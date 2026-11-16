const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['like', 'super-like', 'pass'],
    default: 'like',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Prevent duplicate likes
likeSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });
likeSchema.index({ toUser: 1, type: 1 });

module.exports = mongoose.model('Like', likeSchema);
