const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  // Personal Information
  fullName: { type: String, required: [true, 'Full name is required'], trim: true },
  age: { type: Number, min: 18, max: 100 },
  gender: { type: String, enum: ['male', 'female', 'non-binary', 'prefer-not-to-say', ''] },
  profilePicture: { type: String, default: '' },
  profilePicturePublicId: { type: String, default: '' },
  occupation: { type: String, trim: true },
  company: { type: String, trim: true },
  bio: { type: String, maxlength: 500 },

  // Location & Budget
  currentCity: { type: String, trim: true },
  preferredLocations: [{ type: String, trim: true }],
  preferredNeighbourhoods: [{ type: String, trim: true }],
  budgetMin: { type: Number, min: 0 },
  budgetMax: { type: Number, min: 0 },
  expectedRent: { type: Number, min: 0 },
  maxUtilities: { type: Number, min: 0 },
  moveInDate: { type: Date },
  roomPreference: { type: String, enum: ['private', 'shared', 'any', ''] },
  furnishingPreference: { type: String, enum: ['furnished', 'unfurnished', 'any', ''] },

  // Sleep & Daily Routine
  sleepTime: { type: String },
  wakeTime: { type: String },
  workSchedule: { type: String },
  chronotype: { type: String, enum: ['night-owl', 'early-bird', 'flexible', ''] },
  weekendRoutine: { type: String },
  workFromHome: { type: String, enum: ['always', 'often', 'sometimes', 'rarely', 'never', ''] },

  // Lifestyle
  smokingHabit: { type: String, enum: ['never', 'occasionally', 'regularly', ''] },
  comfortWithSmokers: { type: String, enum: ['yes', 'no', 'outside-only', ''] },
  drinkingHabit: { type: String, enum: ['never', 'occasionally', 'regularly', ''] },
  comfortWithDrinkers: { type: String, enum: ['yes', 'no', 'occasionally', ''] },
  hasPets: { type: Boolean, default: false },
  petType: { type: String },
  comfortWithPets: { type: String, enum: ['yes', 'no', 'depends', ''] },
  guestFrequency: { type: String, enum: ['never', 'rarely', 'sometimes', 'often', ''] },
  partyHabit: { type: String, enum: ['never', 'rarely', 'sometimes', 'often', ''] },
  environmentPreference: { type: String, enum: ['quiet', 'social', 'balanced', ''] },

  // Cleanliness
  cleanlinessLevel: { type: String, enum: ['very-clean', 'clean', 'moderate', 'relaxed', ''] },
  cleaningFrequency: { type: String, enum: ['daily', 'weekly', 'bi-weekly', 'monthly', ''] },
  sharesCleaningDuties: { type: Boolean },
  dishWashing: { type: String, enum: ['immediately', 'same-day', 'when-needed', ''] },
  cookingHabit: { type: String, enum: ['daily', 'often', 'sometimes', 'rarely', 'never', ''] },
  sharesGroceries: { type: Boolean },
  choreArrangement: { type: String, enum: ['schedule', 'informal', 'independent', ''] },

  // Personality
  personalityType: { type: String, enum: ['introvert', 'extrovert', 'ambivert', ''] },
  socialPreference: { type: String, enum: ['social', 'private', 'balanced', ''] },
  livingStyle: { type: String, enum: ['independent', 'shared-activities', 'flexible', ''] },
  communicationStyle: { type: String, enum: ['direct', 'diplomatic', 'casual', ''] },
  noiseTolerance: { type: String, enum: ['low', 'moderate', 'high', ''] },
  interactionLevel: { type: String, enum: ['minimal', 'moderate', 'high', ''] },

  // Onboarding
  onboardingCompleted: { type: Boolean, default: false },
  onboardingStep: { type: Number, default: 0 },
  profileCompletionPercentage: { type: Number, default: 0, min: 0, max: 100 },

  // Verification
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  isIdVerified: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  verificationBadge: { type: Boolean, default: false },

  // Subscription
  subscription: {
    type: String,
    enum: ['free', 'premium', 'pro'],
    default: 'free',
  },
  subscriptionExpiry: { type: Date },

  // Account
  isActive: { type: Boolean, default: true },
  lastActive: { type: Date, default: Date.now },
  isOnline: { type: Boolean, default: false },
  socketId: { type: String },

  // Tokens
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // Blocked users
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
userSchema.index({ currentCity: 1 });
userSchema.index({ budgetMin: 1, budgetMax: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ 'preferredLocations': 1 });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate email verification token
userSchema.methods.getEmailVerificationToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex');
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return token;
};

// Generate reset password token
userSchema.methods.getResetPasswordToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return token;
};

// Calculate profile completion
userSchema.methods.calculateProfileCompletion = function () {
  const fields = [
    'fullName', 'age', 'gender', 'profilePicture', 'occupation', 'bio',
    'currentCity', 'budgetMin', 'budgetMax',
    'sleepTime', 'wakeTime', 'chronotype',
    'smokingHabit', 'drinkingHabit', 'environmentPreference',
    'cleanlinessLevel', 'cleaningFrequency',
    'personalityType', 'socialPreference',
  ];
  const filled = fields.filter(f => this[f] && this[f] !== '').length;
  return Math.round((filled / fields.length) * 100);
};

module.exports = mongoose.model('User', userSchema);
