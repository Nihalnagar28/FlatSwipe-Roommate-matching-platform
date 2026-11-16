/**
 * FlatMate Compatibility Algorithm
 * 
 * Calculates a weighted compatibility score (0-100) between two users
 * based on their lifestyle preferences, budget, location, and habits.
 */

const WEIGHTS = {
  budget: 0.20,
  location: 0.15,
  sleepSchedule: 0.15,
  cleanliness: 0.15,
  smokingDrinking: 0.10,
  socialParty: 0.10,
  petsGuests: 0.05,
  personality: 0.10,
};

/**
 * Calculate budget compatibility (0-100)
 */
function calcBudgetScore(user1, user2) {
  if (!user1.budgetMax || !user2.budgetMax) return 50; // neutral if missing
  
  const range1 = { min: user1.budgetMin || 0, max: user1.budgetMax };
  const range2 = { min: user2.budgetMin || 0, max: user2.budgetMax };
  
  // Check overlap
  const overlapStart = Math.max(range1.min, range2.min);
  const overlapEnd = Math.min(range1.max, range2.max);
  
  if (overlapStart <= overlapEnd) {
    const overlapSize = overlapEnd - overlapStart;
    const totalRange = Math.max(range1.max, range2.max) - Math.min(range1.min, range2.min);
    return totalRange > 0 ? Math.round((overlapSize / totalRange) * 100) : 100;
  }
  
  // No overlap - calculate how far apart
  const gap = overlapStart - overlapEnd;
  const avgBudget = ((range1.max + range2.max) / 2) || 1;
  return Math.max(0, Math.round(100 - (gap / avgBudget) * 100));
}

/**
 * Calculate location compatibility (0-100)
 */
function calcLocationScore(user1, user2) {
  if (!user1.currentCity || !user2.currentCity) return 50;
  
  let score = 0;
  
  // Same city
  if (user1.currentCity.toLowerCase() === user2.currentCity.toLowerCase()) {
    score += 60;
  }
  
  // Check preferred locations overlap
  const locs1 = (user1.preferredLocations || []).map(l => l.toLowerCase());
  const locs2 = (user2.preferredLocations || []).map(l => l.toLowerCase());
  
  if (locs1.length > 0 && locs2.length > 0) {
    const common = locs1.filter(l => locs2.includes(l));
    const overlapRatio = common.length / Math.max(locs1.length, locs2.length);
    score += Math.round(overlapRatio * 40);
  } else if (score >= 60) {
    score += 20; // Same city, no specific location prefs
  }
  
  return Math.min(100, score);
}

/**
 * Calculate sleep schedule compatibility (0-100)
 */
function calcSleepScore(user1, user2) {
  let score = 50;
  
  // Chronotype match
  if (user1.chronotype && user2.chronotype) {
    if (user1.chronotype === user2.chronotype) score = 90;
    else if (user1.chronotype === 'flexible' || user2.chronotype === 'flexible') score = 75;
    else score = 30; // owl vs bird
  }
  
  // Sleep time comparison
  if (user1.sleepTime && user2.sleepTime) {
    const t1 = parseTimeToMinutes(user1.sleepTime);
    const t2 = parseTimeToMinutes(user2.sleepTime);
    const diff = Math.abs(t1 - t2);
    const timePenalty = Math.min(diff / 180, 1); // 3 hour window
    score = Math.round(score * (1 - timePenalty * 0.3));
  }
  
  return Math.min(100, Math.max(0, score));
}

/**
 * Calculate cleanliness compatibility (0-100)
 */
function calcCleanlinessScore(user1, user2) {
  const levels = { 'very-clean': 4, 'clean': 3, 'moderate': 2, 'relaxed': 1 };
  const freqs = { 'daily': 4, 'weekly': 3, 'bi-weekly': 2, 'monthly': 1 };
  const dishes = { 'immediately': 3, 'same-day': 2, 'when-needed': 1 };
  
  let scores = [];
  
  if (user1.cleanlinessLevel && user2.cleanlinessLevel) {
    const diff = Math.abs((levels[user1.cleanlinessLevel] || 2) - (levels[user2.cleanlinessLevel] || 2));
    scores.push(100 - diff * 25);
  }
  
  if (user1.cleaningFrequency && user2.cleaningFrequency) {
    const diff = Math.abs((freqs[user1.cleaningFrequency] || 2) - (freqs[user2.cleaningFrequency] || 2));
    scores.push(100 - diff * 25);
  }
  
  if (user1.dishWashing && user2.dishWashing) {
    const diff = Math.abs((dishes[user1.dishWashing] || 2) - (dishes[user2.dishWashing] || 2));
    scores.push(100 - diff * 33);
  }
  
  return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 50;
}

/**
 * Calculate smoking/drinking compatibility (0-100)
 */
function calcSmokingDrinkingScore(user1, user2) {
  let scores = [];
  
  // Smoking
  if (user1.smokingHabit && user2.comfortWithSmokers) {
    if (user1.smokingHabit === 'never' || user2.comfortWithSmokers === 'yes') scores.push(100);
    else if (user2.comfortWithSmokers === 'outside-only' && user1.smokingHabit === 'occasionally') scores.push(70);
    else if (user2.comfortWithSmokers === 'no' && user1.smokingHabit !== 'never') scores.push(20);
    else scores.push(50);
  }
  
  if (user2.smokingHabit && user1.comfortWithSmokers) {
    if (user2.smokingHabit === 'never' || user1.comfortWithSmokers === 'yes') scores.push(100);
    else if (user1.comfortWithSmokers === 'outside-only' && user2.smokingHabit === 'occasionally') scores.push(70);
    else if (user1.comfortWithSmokers === 'no' && user2.smokingHabit !== 'never') scores.push(20);
    else scores.push(50);
  }
  
  // Drinking
  if (user1.drinkingHabit && user2.comfortWithDrinkers) {
    if (user1.drinkingHabit === 'never' || user2.comfortWithDrinkers === 'yes') scores.push(100);
    else if (user2.comfortWithDrinkers === 'no' && user1.drinkingHabit !== 'never') scores.push(30);
    else scores.push(60);
  }
  
  if (user2.drinkingHabit && user1.comfortWithDrinkers) {
    if (user2.drinkingHabit === 'never' || user1.comfortWithDrinkers === 'yes') scores.push(100);
    else if (user1.comfortWithDrinkers === 'no' && user2.drinkingHabit !== 'never') scores.push(30);
    else scores.push(60);
  }
  
  return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 50;
}

/**
 * Calculate social/party compatibility (0-100)
 */
function calcSocialScore(user1, user2) {
  const envMap = { 'quiet': 1, 'balanced': 2, 'social': 3 };
  const partyMap = { 'never': 1, 'rarely': 2, 'sometimes': 3, 'often': 4 };
  
  let scores = [];
  
  if (user1.environmentPreference && user2.environmentPreference) {
    const diff = Math.abs((envMap[user1.environmentPreference] || 2) - (envMap[user2.environmentPreference] || 2));
    scores.push(100 - diff * 40);
  }
  
  if (user1.partyHabit && user2.partyHabit) {
    const diff = Math.abs((partyMap[user1.partyHabit] || 2) - (partyMap[user2.partyHabit] || 2));
    scores.push(100 - diff * 25);
  }
  
  return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 50;
}

/**
 * Calculate pets/guests compatibility (0-100)
 */
function calcPetsGuestsScore(user1, user2) {
  let scores = [];
  
  // Pets
  if (user1.hasPets && user2.comfortWithPets) {
    if (user2.comfortWithPets === 'yes') scores.push(100);
    else if (user2.comfortWithPets === 'depends') scores.push(60);
    else scores.push(20);
  }
  if (user2.hasPets && user1.comfortWithPets) {
    if (user1.comfortWithPets === 'yes') scores.push(100);
    else if (user1.comfortWithPets === 'depends') scores.push(60);
    else scores.push(20);
  }
  
  // Guest frequency
  const guestMap = { 'never': 1, 'rarely': 2, 'sometimes': 3, 'often': 4 };
  if (user1.guestFrequency && user2.guestFrequency) {
    const diff = Math.abs((guestMap[user1.guestFrequency] || 2) - (guestMap[user2.guestFrequency] || 2));
    scores.push(100 - diff * 25);
  }
  
  return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 50;
}

/**
 * Calculate personality compatibility (0-100)
 */
function calcPersonalityScore(user1, user2) {
  let scores = [];
  
  // Personality type - ambiverts are flexible
  const pMap = { 'introvert': 1, 'ambivert': 2, 'extrovert': 3 };
  if (user1.personalityType && user2.personalityType) {
    const diff = Math.abs((pMap[user1.personalityType] || 2) - (pMap[user2.personalityType] || 2));
    scores.push(100 - diff * 25);
  }
  
  // Social preference
  const sMap = { 'private': 1, 'balanced': 2, 'social': 3 };
  if (user1.socialPreference && user2.socialPreference) {
    const diff = Math.abs((sMap[user1.socialPreference] || 2) - (sMap[user2.socialPreference] || 2));
    scores.push(100 - diff * 30);
  }
  
  // Noise tolerance
  const nMap = { 'low': 1, 'moderate': 2, 'high': 3 };
  if (user1.noiseTolerance && user2.noiseTolerance) {
    const diff = Math.abs((nMap[user1.noiseTolerance] || 2) - (nMap[user2.noiseTolerance] || 2));
    scores.push(100 - diff * 30);
  }
  
  return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 50;
}

/**
 * Generate human-readable compatibility explanations
 */
function generateExplanations(user1, user2, breakdown) {
  const explanations = [];
  
  if (breakdown.budget >= 70) {
    explanations.push('Both have compatible budget ranges');
  }
  if (breakdown.location >= 70) {
    explanations.push('Both prefer similar locations');
  }
  if (breakdown.sleepSchedule >= 70) {
    const chronoLabel = user1.chronotype === 'night-owl' ? 'night owls' : user1.chronotype === 'early-bird' ? 'early risers' : 'have flexible schedules';
    explanations.push(`Both ${chronoLabel}`);
  }
  if (breakdown.cleanliness >= 70) {
    explanations.push('Similar cleanliness standards');
  }
  if (breakdown.smokingDrinking >= 80) {
    explanations.push('Compatible smoking and drinking preferences');
  }
  if (breakdown.socialParty >= 70) {
    const env = user1.environmentPreference === 'quiet' ? 'peaceful' : user1.environmentPreference === 'social' ? 'social' : 'balanced';
    explanations.push(`Both prefer a ${env} living environment`);
  }
  if (breakdown.personality >= 70) {
    explanations.push('Compatible personality types');
  }
  
  if (breakdown.sleepSchedule < 40) {
    explanations.push('Different sleep schedules may need adjustment');
  }
  if (breakdown.smokingDrinking < 40) {
    explanations.push('Smoking/drinking preferences differ significantly');
  }
  
  return explanations;
}

/**
 * Check non-negotiables
 */
function checkNonNegotiables(user1, user2, preferences1) {
  if (!preferences1 || !preferences1.nonNegotiables) return { pass: true, violations: [] };
  
  const violations = [];
  for (const nn of preferences1.nonNegotiables) {
    if (nn.factor === 'smoking' && nn.value === 'never' && user2.smokingHabit && user2.smokingHabit !== 'never') {
      violations.push('Smoking is a non-negotiable');
    }
    if (nn.factor === 'pets' && nn.value === 'no' && user2.hasPets) {
      violations.push('No pets is a non-negotiable');
    }
    if (nn.factor === 'drinking' && nn.value === 'never' && user2.drinkingHabit && user2.drinkingHabit !== 'never') {
      violations.push('No drinking is a non-negotiable');
    }
  }
  
  return { pass: violations.length === 0, violations };
}

/**
 * Main compatibility calculation
 */
function calculateCompatibility(user1, user2, prefs1 = null, prefs2 = null) {
  const breakdown = {
    budget: calcBudgetScore(user1, user2),
    location: calcLocationScore(user1, user2),
    sleepSchedule: calcSleepScore(user1, user2),
    cleanliness: calcCleanlinessScore(user1, user2),
    smokingDrinking: calcSmokingDrinkingScore(user1, user2),
    socialParty: calcSocialScore(user1, user2),
    petsGuests: calcPetsGuestsScore(user1, user2),
    personality: calcPersonalityScore(user1, user2),
  };
  
  // Weighted total
  const total = Math.round(
    breakdown.budget * WEIGHTS.budget +
    breakdown.location * WEIGHTS.location +
    breakdown.sleepSchedule * WEIGHTS.sleepSchedule +
    breakdown.cleanliness * WEIGHTS.cleanliness +
    breakdown.smokingDrinking * WEIGHTS.smokingDrinking +
    breakdown.socialParty * WEIGHTS.socialParty +
    breakdown.petsGuests * WEIGHTS.petsGuests +
    breakdown.personality * WEIGHTS.personality
  );
  
  const explanations = generateExplanations(user1, user2, breakdown);
  
  // Check non-negotiables from both sides
  const nn1 = checkNonNegotiables(user1, user2, prefs1);
  const nn2 = checkNonNegotiables(user2, user1, prefs2);
  
  return {
    score: total,
    breakdown,
    explanations,
    nonNegotiableViolations: [...nn1.violations, ...nn2.violations],
    passesNonNegotiables: nn1.pass && nn2.pass,
  };
}

/**
 * Helper: Parse "HH:MM" or "10:30 PM" to minutes since midnight
 */
function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 720; // noon default
  
  // Handle 24h format
  let match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
  if (match) {
    return parseInt(match[1]) * 60 + parseInt(match[2]);
  }
  
  // Handle 12h format
  match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match) {
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }
  
  return 720;
}

module.exports = { calculateCompatibility, WEIGHTS };
