const mongoose = require('mongoose');

const meetupSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  proposedDate: { type: Date, required: true },
  proposedTime: { type: String, required: true },
  location: { type: String, required: true },
  locationDetails: { type: String },
  message: { type: String, maxlength: 500 },
  status: { type: String, enum: ['pending', 'accepted', 'declined', 'cancelled', 'completed'], default: 'pending' },
  checklist: {
    rentAndDeposit: { type: Boolean, default: false },
    bills: { type: Boolean, default: false },
    cleaning: { type: Boolean, default: false },
    groceries: { type: Boolean, default: false },
    guests: { type: Boolean, default: false },
    noise: { type: Boolean, default: false },
    sharedExpenses: { type: Boolean, default: false },
    rentalAgreement: { type: Boolean, default: false },
  },
  notes: { type: String, maxlength: 1000 },
}, { timestamps: true });

meetupSchema.index({ match: 1 });

module.exports = mongoose.model('Meetup', meetupSchema);
