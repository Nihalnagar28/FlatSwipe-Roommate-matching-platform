const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: __dirname + '/../../.env' });

const User = require('../models/User');
const UserPreference = require('../models/UserPreference');
const Listing = require('../models/Listing');
const Like = require('../models/Like');
const Match = require('../models/Match');
const Message = require('../models/Message');
const { Verification, Report, Subscription, Notification } = require('../models/Others');
const { calculateCompatibility } = require('../services/compatibilityService');

const sampleUsers = [
  {
    fullName: 'Aarav Sharma',
    email: 'aarav@example.com',
    password: 'password123',
    age: 25,
    gender: 'male',
    profilePicture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    occupation: 'Software Engineer',
    company: 'TechCorp',
    bio: 'Backend developer who loves cooking and board games. Clean and organized, early riser, quiet during weekdays.',
    currentCity: 'Bangalore',
    preferredLocations: ['Indiranagar', 'Koramangala', 'HSR Layout'],
    budgetMin: 15000,
    budgetMax: 25000,
    expectedRent: 20000,
    maxUtilities: 3000,
    roomPreference: 'private',
    furnishingPreference: 'furnished',
    sleepTime: '23:30',
    wakeTime: '07:00',
    chronotype: 'early-bird',
    workSchedule: '9 AM - 6 PM Hybrid',
    workFromHome: 'sometimes',
    smokingHabit: 'never',
    comfortWithSmokers: 'outside-only',
    drinkingHabit: 'occasionally',
    comfortWithDrinkers: 'yes',
    hasPets: false,
    comfortWithPets: 'yes',
    guestFrequency: 'sometimes',
    partyHabit: 'rarely',
    environmentPreference: 'balanced',
    cleanlinessLevel: 'very-clean',
    cleaningFrequency: 'weekly',
    sharesCleaningDuties: true,
    dishWashing: 'immediately',
    cookingHabit: 'often',
    sharesGroceries: true,
    choreArrangement: 'schedule',
    personalityType: 'ambivert',
    socialPreference: 'balanced',
    livingStyle: 'independent',
    communicationStyle: 'direct',
    noiseTolerance: 'moderate',
    interactionLevel: 'moderate',
    onboardingCompleted: true,
    onboardingStep: 7,
    profileCompletionPercentage: 100,
    isEmailVerified: true,
    isIdVerified: true,
    verificationBadge: true,
  },
  {
    fullName: 'Priya Patel',
    email: 'priya@example.com',
    password: 'password123',
    age: 24,
    gender: 'female',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    occupation: 'UX/UI Designer',
    company: 'Design Studio',
    bio: 'Creative soul, plant mom, and tea enthusiast. Love quiet evenings with books and occasional weekend brunches.',
    currentCity: 'Bangalore',
    preferredLocations: ['Koramangala', 'Indiranagar', 'Bellandur'],
    budgetMin: 18000,
    budgetMax: 28000,
    expectedRent: 22000,
    maxUtilities: 3500,
    roomPreference: 'private',
    furnishingPreference: 'furnished',
    sleepTime: '00:00',
    wakeTime: '07:30',
    chronotype: 'flexible',
    workSchedule: '10 AM - 7 PM WFH',
    workFromHome: 'often',
    smokingHabit: 'never',
    comfortWithSmokers: 'no',
    drinkingHabit: 'never',
    comfortWithDrinkers: 'yes',
    hasPets: true,
    petType: 'Cat (Whiskey)',
    comfortWithPets: 'yes',
    guestFrequency: 'rarely',
    partyHabit: 'never',
    environmentPreference: 'quiet',
    cleanlinessLevel: 'very-clean',
    cleaningFrequency: 'daily',
    sharesCleaningDuties: true,
    dishWashing: 'immediately',
    cookingHabit: 'daily',
    sharesGroceries: false,
    choreArrangement: 'schedule',
    personalityType: 'introvert',
    socialPreference: 'private',
    livingStyle: 'independent',
    communicationStyle: 'diplomatic',
    noiseTolerance: 'low',
    interactionLevel: 'minimal',
    onboardingCompleted: true,
    onboardingStep: 7,
    profileCompletionPercentage: 100,
    isEmailVerified: true,
    isIdVerified: true,
    verificationBadge: true,
  },
  {
    fullName: 'Rohan Verma',
    email: 'rohan@example.com',
    password: 'password123',
    age: 26,
    gender: 'male',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    occupation: 'Product Manager',
    company: 'Fintech Co',
    bio: 'Active lifestyle, gym-goer, weekend trekker. Looking for someone chill who keeps common areas clean.',
    currentCity: 'Bangalore',
    preferredLocations: ['HSR Layout', 'Koramangala', 'BTM Layout'],
    budgetMin: 16000,
    budgetMax: 26000,
    expectedRent: 20000,
    maxUtilities: 3000,
    roomPreference: 'private',
    furnishingPreference: 'furnished',
    sleepTime: '23:00',
    wakeTime: '06:30',
    chronotype: 'early-bird',
    workSchedule: '9 AM - 6 PM In-office',
    workFromHome: 'rarely',
    smokingHabit: 'never',
    comfortWithSmokers: 'outside-only',
    drinkingHabit: 'occasionally',
    comfortWithDrinkers: 'yes',
    hasPets: false,
    comfortWithPets: 'yes',
    guestFrequency: 'sometimes',
    partyHabit: 'rarely',
    environmentPreference: 'balanced',
    cleanlinessLevel: 'clean',
    cleaningFrequency: 'weekly',
    sharesCleaningDuties: true,
    dishWashing: 'same-day',
    cookingHabit: 'sometimes',
    sharesGroceries: true,
    choreArrangement: 'informal',
    personalityType: 'extrovert',
    socialPreference: 'social',
    livingStyle: 'shared-activities',
    communicationStyle: 'direct',
    noiseTolerance: 'moderate',
    interactionLevel: 'high',
    onboardingCompleted: true,
    onboardingStep: 7,
    profileCompletionPercentage: 100,
    isEmailVerified: true,
    isIdVerified: true,
    verificationBadge: true,
  },
  {
    fullName: 'Ananya Deshmukh',
    email: 'ananya@example.com',
    password: 'password123',
    age: 23,
    gender: 'female',
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    occupation: 'Content Strategist',
    company: 'Media House',
    bio: 'Writer, coffee addict, love indie cinema and aesthetic cafes. Looking for a neat flatmate to share a cozy 2BHK.',
    currentCity: 'Mumbai',
    preferredLocations: ['Bandra', 'Khar', 'Andheri West'],
    budgetMin: 25000,
    budgetMax: 40000,
    expectedRent: 30000,
    maxUtilities: 4000,
    roomPreference: 'private',
    furnishingPreference: 'furnished',
    sleepTime: '01:00',
    wakeTime: '08:30',
    chronotype: 'night-owl',
    workSchedule: 'Flexible hours',
    workFromHome: 'always',
    smokingHabit: 'occasionally',
    comfortWithSmokers: 'yes',
    drinkingHabit: 'occasionally',
    comfortWithDrinkers: 'yes',
    hasPets: false,
    comfortWithPets: 'yes',
    guestFrequency: 'often',
    partyHabit: 'sometimes',
    environmentPreference: 'social',
    cleanlinessLevel: 'clean',
    cleaningFrequency: 'weekly',
    sharesCleaningDuties: true,
    dishWashing: 'same-day',
    cookingHabit: 'sometimes',
    sharesGroceries: false,
    choreArrangement: 'informal',
    personalityType: 'extrovert',
    socialPreference: 'social',
    livingStyle: 'shared-activities',
    communicationStyle: 'casual',
    noiseTolerance: 'high',
    interactionLevel: 'high',
    onboardingCompleted: true,
    onboardingStep: 7,
    profileCompletionPercentage: 100,
    isEmailVerified: true,
    isIdVerified: false,
    verificationBadge: false,
  },
  {
    fullName: 'Siddharth Nair',
    email: 'siddharth@example.com',
    password: 'password123',
    age: 27,
    gender: 'male',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    occupation: 'Financial Analyst',
    company: 'Investment Bank',
    bio: 'Disciplined professional, marathon runner, early bird. I value peace and quiet after a long day at work.',
    currentCity: 'Mumbai',
    preferredLocations: ['Lower Parel', 'Worli', 'Bandra East'],
    budgetMin: 30000,
    budgetMax: 50000,
    expectedRent: 40000,
    maxUtilities: 5000,
    roomPreference: 'private',
    furnishingPreference: 'furnished',
    sleepTime: '22:30',
    wakeTime: '05:30',
    chronotype: 'early-bird',
    workSchedule: '8 AM - 7 PM In-office',
    workFromHome: 'never',
    smokingHabit: 'never',
    comfortWithSmokers: 'no',
    drinkingHabit: 'occasionally',
    comfortWithDrinkers: 'yes',
    hasPets: false,
    comfortWithPets: 'depends',
    guestFrequency: 'rarely',
    partyHabit: 'never',
    environmentPreference: 'quiet',
    cleanlinessLevel: 'very-clean',
    cleaningFrequency: 'daily',
    sharesCleaningDuties: true,
    dishWashing: 'immediately',
    cookingHabit: 'rarely',
    sharesGroceries: false,
    choreArrangement: 'schedule',
    personalityType: 'introvert',
    socialPreference: 'private',
    livingStyle: 'independent',
    communicationStyle: 'direct',
    noiseTolerance: 'low',
    interactionLevel: 'minimal',
    onboardingCompleted: true,
    onboardingStep: 7,
    profileCompletionPercentage: 100,
    isEmailVerified: true,
    isIdVerified: true,
    verificationBadge: true,
  },
  {
    fullName: 'Kavya Reddy',
    email: 'kavya@example.com',
    password: 'password123',
    age: 23,
    gender: 'female',
    profilePicture: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    occupation: 'Data Scientist',
    company: 'AI Labs',
    bio: 'Tech enthusiast, salsa dancer, loves baking cookies. Looking for a friendly flatmate who respects personal space.',
    currentCity: 'Bangalore',
    preferredLocations: ['Indiranagar', 'Domlur', 'Koramangala'],
    budgetMin: 18000,
    budgetMax: 26000,
    expectedRent: 22000,
    maxUtilities: 3000,
    roomPreference: 'private',
    furnishingPreference: 'furnished',
    sleepTime: '00:00',
    wakeTime: '07:30',
    chronotype: 'flexible',
    workSchedule: '10 AM - 6 PM Hybrid',
    workFromHome: 'sometimes',
    smokingHabit: 'never',
    comfortWithSmokers: 'no',
    drinkingHabit: 'occasionally',
    comfortWithDrinkers: 'yes',
    hasPets: false,
    comfortWithPets: 'yes',
    guestFrequency: 'sometimes',
    partyHabit: 'rarely',
    environmentPreference: 'balanced',
    cleanlinessLevel: 'very-clean',
    cleaningFrequency: 'weekly',
    sharesCleaningDuties: true,
    dishWashing: 'immediately',
    cookingHabit: 'daily',
    sharesGroceries: true,
    choreArrangement: 'schedule',
    personalityType: 'ambivert',
    socialPreference: 'balanced',
    livingStyle: 'shared-activities',
    communicationStyle: 'diplomatic',
    noiseTolerance: 'moderate',
    interactionLevel: 'moderate',
    onboardingCompleted: true,
    onboardingStep: 7,
    profileCompletionPercentage: 100,
    isEmailVerified: true,
    isIdVerified: true,
    verificationBadge: true,
  },
  {
    fullName: 'Admin User',
    email: 'admin@flatmate.com',
    password: 'password123',
    role: 'admin',
    age: 30,
    gender: 'prefer-not-to-say',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
    occupation: 'Platform Administrator',
    company: 'FlatMate Inc.',
    bio: 'Official FlatMate platform administrator and safety monitor.',
    currentCity: 'Bangalore',
    onboardingCompleted: true,
    isEmailVerified: true,
    isIdVerified: true,
    verificationBadge: true,
  }
];

const sampleListings = [
  {
    title: 'Spacious Master Bedroom in Indiranagar 3BHK',
    description: 'Looking for a clean flatmate for a master bedroom with attached bathroom and private balcony in a luxury 3BHK gated society. Fully equipped modular kitchen, 100% power backup, high-speed WiFi, gym, and swimming pool access.',
    propertyType: 'apartment',
    images: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800' }
    ],
    location: {
      city: 'Bangalore',
      area: 'Indiranagar 100ft Road',
      address: 'Near Metro Station, 12th Main',
      coordinates: { lat: 12.9784, lng: 77.6408 }
    },
    rent: 22000,
    securityDeposit: 60000,
    availableRooms: 1,
    totalRooms: 3,
    amenities: ['WiFi', 'Power Backup', 'Washing Machine', 'Air Conditioning', 'Elevator', 'Gym', 'Swimming Pool', 'Security Guard', 'Balcony'],
    furnishingStatus: 'furnished',
    availableFrom: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    houseRules: ['No smoking indoors', 'Clean common spaces after use', 'Overnight guests allowed with prior intimation'],
    preferredTenantGender: 'any',
    isVerified: true,
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'Cozy Room in Koramangala 4th Block Flat',
    description: 'Sunny private room in a vibrant 2BHK flat. Close to all top cafes, restaurants, and co-working spaces. Ideal for working professionals.',
    propertyType: 'apartment',
    images: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800' }
    ],
    location: {
      city: 'Bangalore',
      area: 'Koramangala 4th Block',
      address: 'Sony World Signal vicinity',
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    rent: 19000,
    securityDeposit: 50000,
    availableRooms: 1,
    totalRooms: 2,
    amenities: ['WiFi', 'Washing Machine', 'Refrigerator', 'Kitchen', 'Balcony', 'Geyser'],
    furnishingStatus: 'furnished',
    availableFrom: new Date(),
    houseRules: ['Respect quiet hours after 11 PM', 'No smoking'],
    preferredTenantGender: 'any',
    isVerified: true,
    isActive: true,
  },
  {
    title: 'Modern 2BHK Shared Flat near HSR Sector 2',
    description: 'Private furnished room available with queen bed, wardrobe, study desk and high speed fiber internet. Friendly housemates, chill vibe.',
    propertyType: 'apartment',
    images: [
      { url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800' }
    ],
    location: {
      city: 'Bangalore',
      area: 'HSR Layout Sector 2',
      address: '27th Main Road',
      coordinates: { lat: 12.9121, lng: 77.6446 }
    },
    rent: 17500,
    securityDeposit: 45000,
    availableRooms: 1,
    totalRooms: 2,
    amenities: ['WiFi', 'Power Backup', 'Washing Machine', 'RO Water Purifier', 'Parking'],
    furnishingStatus: 'furnished',
    availableFrom: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    houseRules: ['Keep kitchen clean', 'Smoking only in balcony'],
    preferredTenantGender: 'any',
    isVerified: true,
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear old data
    await User.deleteMany({});
    await UserPreference.deleteMany({});
    await Listing.deleteMany({});
    await Like.deleteMany({});
    await Match.deleteMany({});
    await Message.deleteMany({});
    await Notification.deleteMany({});
    await Verification.deleteMany({});
    await Report.deleteMany({});

    console.log('Cleared existing data.');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = await User.create(userData);
      createdUsers.push(user);

      // Create preferences for each user
      await UserPreference.create({
        user: user._id,
        preferredBudgetMin: user.budgetMin ? user.budgetMin - 3000 : 15000,
        preferredBudgetMax: user.budgetMax ? user.budgetMax + 3000 : 30000,
        preferredSleepSchedule: user.chronotype || 'flexible',
        preferredSmokingHabit: user.comfortWithSmokers === 'no' ? 'never' : 'any',
        preferredDrinkingHabit: 'any',
        preferredPetPolicy: user.comfortWithPets === 'yes' ? 'any-pets' : 'no-pets',
        preferredPartyFrequency: user.partyHabit || 'sometimes',
        preferredEnvironment: user.environmentPreference || 'balanced',
        preferredCleanlinessLevel: user.cleanlinessLevel || 'clean',
        preferredLocations: user.preferredLocations || [],
        preferredGender: 'any',
        preferredAgeMin: 20,
        preferredAgeMax: 32,
      });
    }

    console.log(`Seeded ${createdUsers.length} users with preferences.`);

    // Create listings assigned to users
    sampleListings[0].owner = createdUsers[0]._id;
    sampleListings[1].owner = createdUsers[1]._id;
    sampleListings[2].owner = createdUsers[2]._id;

    for (const listingData of sampleListings) {
      await Listing.create(listingData);
    }
    console.log(`Seeded ${sampleListings.length} listings.`);

    // Create mutual like & match between Aarav (0) and Priya (1)
    const u1 = createdUsers[0];
    const u2 = createdUsers[1];

    await Like.create({ fromUser: u1._id, toUser: u2._id, type: 'like' });
    await Like.create({ fromUser: u2._id, toUser: u1._id, type: 'like' });

    const p1 = await UserPreference.findOne({ user: u1._id });
    const p2 = await UserPreference.findOne({ user: u2._id });
    const compat = calculateCompatibility(u1, u2, p1, p2);

    const match = await Match.create({
      users: [u1._id, u2._id],
      compatibilityScore: compat.score,
      compatibilityBreakdown: compat.breakdown,
      compatibilityExplanations: compat.explanations,
    });

    // Create some initial chat messages
    const m1 = await Message.create({
      match: match._id,
      sender: u1._id,
      receiver: u2._id,
      content: 'Hey Priya! Saw your profile — our sleep schedules and work routines seem super aligned!',
      messageType: 'text',
      isRead: true,
      readAt: new Date(Date.now() - 3600000),
    });

    const m2 = await Message.create({
      match: match._id,
      sender: u2._id,
      receiver: u1._id,
      content: 'Hey Aarav! Yes, totally! I noticed you are looking around Indiranagar too. Have you checked any flats yet?',
      messageType: 'text',
      isRead: false,
    });

    match.lastMessage = m2._id;
    match.lastMessageAt = m2.createdAt;
    await match.save();

    console.log('Created sample match and messages between Aarav and Priya.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
