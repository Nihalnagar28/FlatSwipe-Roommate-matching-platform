const mongoose = require('mongoose');

const userPreferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },

  // Budget preferences for ideal flatmate
  preferredBudgetMin: { type: Number },
  preferredBudgetMax: { type: Number },

  // Schedule preferences
  preferredSleepSchedule: { type: String, enum: ['night-owl', 'early-bird', 'flexible', ''] },
  preferredWorkSchedule: { type: String },

  // Lifestyle preferences
  preferredSmokingHabit: { type: String, enum: ['never', 'occasionally', 'any', ''] },
  preferredDrinkingHabit: { type: String, enum: ['never', 'occasionally', 'any', ''] },
  preferredPetPolicy: { type: String, enum: ['no-pets', 'cats-ok', 'dogs-ok', 'any-pets', ''] },
  preferredPartyFrequency: { type: String, enum: ['never', 'rarely', 'sometimes', 'any', ''] },
  preferredGuestFrequency: { type: String, enum: ['never', 'rarely', 'sometimes', 'any', ''] },
  preferredEnvironment: { type: String, enum: ['quiet', 'social', 'balanced', ''] },

  // Cleanliness
  preferredCleanlinessLevel: { type: String, enum: ['very-clean', 'clean', 'moderate', 'any', ''] },

  // Location
  preferredLocations: [{ type: String }],

  // Gender
  preferredGender: { type: String, enum: ['male', 'female', 'any', ''] },

  // Age range
  preferredAgeMin: { type: Number, min: 18 },
  preferredAgeMax: { type: Number, max: 100 },

  // Non-negotiables
  nonNegotiables: [{
    factor: { type: String },
    value: { type: String },
  }],

  // Other requirements
  otherRequirements: { type: String, maxlength: 500 },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserPreference', userPreferenceSchema);
