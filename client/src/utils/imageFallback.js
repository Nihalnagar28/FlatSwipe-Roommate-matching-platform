// Bulletproof image fallback generators for FlatSwipe PropTech platform
// Guarantees zero broken images even offline or if external CDNs return 403 Forbidden.

export const getProfileFallback = (name = 'Member') => {
  const initials = (name || 'U')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'FM';

  const cleanName = (name || 'Verified Flatmate').replace(/["'<>]/g, '').slice(0, 24);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="100%" height="100%">
    <defs>
      <linearGradient id="pgrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#315C4C"/>
        <stop offset="50%" stop-color="#3D6E5C"/>
        <stop offset="100%" stop-color="#202622"/>
      </linearGradient>
      <radialGradient id="pglow" cx="50%" cy="38%" r="50%">
        <stop offset="0%" stop-color="#527565" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#202622" stop-opacity="0.95"/>
      </radialGradient>
    </defs>
    <rect width="400" height="480" fill="url(#pgrad)"/>
    <rect width="400" height="480" fill="url(#pglow)"/>
    <!-- Decorative background rings -->
    <circle cx="200" cy="190" r="110" fill="none" stroke="#E5E7E2" stroke-opacity="0.08" stroke-width="1.5"/>
    <circle cx="200" cy="190" r="92" fill="none" stroke="#D9A16A" stroke-opacity="0.25" stroke-width="1.5" stroke-dasharray="4 4"/>
    <!-- Central Avatar Circle -->
    <circle cx="200" cy="190" r="72" fill="#E8EAE3" fill-opacity="0.14" stroke="#F8F8F5" stroke-opacity="0.3" stroke-width="2"/>
    <text x="200" y="208" font-family="Manrope, Inter, system-ui, sans-serif" font-size="52" font-weight="800" fill="#F8F8F5" text-anchor="middle" letter-spacing="2">${initials}</text>
    <!-- Label -->
    <text x="200" y="305" font-family="Manrope, Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="#F8F8F5" text-anchor="middle" letter-spacing="0.5">${cleanName}</text>
    <rect x="130" y="322" width="140" height="22" rx="11" fill="#315C4C" fill-opacity="0.8" stroke="#D9A16A" stroke-width="1"/>
    <text x="200" y="337" font-family="Manrope, Inter, system-ui, sans-serif" font-size="10" font-weight="700" fill="#D9A16A" text-anchor="middle" letter-spacing="1">VERIFIED RESIDENT</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const getListingFallback = (title = 'Cozy Room in Flat') => {
  const cleanTitle = (title || 'Verified Flat').replace(/["'<>]/g, '').slice(0, 30);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
    <defs>
      <linearGradient id="lgrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D4D40"/>
        <stop offset="65%" stop-color="#202622"/>
        <stop offset="100%" stop-color="#191F1B"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#lgrad)"/>
    <!-- Room perspective architecture -->
    <path d="M 0 0 L 140 90 L 460 90 L 600 0 Z" fill="#315C4C" fill-opacity="0.18"/>
    <path d="M 140 90 L 140 310 L 460 310 L 460 90 Z" fill="#3D6E5C" fill-opacity="0.12"/>
    <path d="M 0 400 L 140 310 L 460 310 L 600 400 Z" fill="#181D1A" fill-opacity="0.3"/>
    <!-- Window with ambient warm daylight -->
    <rect x="250" y="125" width="100" height="110" rx="6" fill="#D9A16A" fill-opacity="0.22" stroke="#E5E7E2" stroke-opacity="0.35" stroke-width="2"/>
    <line x1="300" y1="125" x2="300" y2="235" stroke="#E5E7E2" stroke-opacity="0.35" stroke-width="2"/>
    <line x1="250" y1="180" x2="350" y2="180" stroke="#E5E7E2" stroke-opacity="0.35" stroke-width="2"/>
    <!-- Property badge -->
    <rect x="200" y="275" width="200" height="28" rx="14" fill="#315C4C" stroke="#D9A16A" stroke-width="1.5"/>
    <text x="300" y="293" font-family="Manrope, Inter, system-ui, sans-serif" font-size="11" font-weight="700" fill="#F8F8F5" text-anchor="middle" letter-spacing="1">FLATSWIPE VERIFIED</text>
    <text x="300" y="340" font-family="Manrope, Inter, system-ui, sans-serif" font-size="14" font-weight="700" fill="#F8F8F5" text-anchor="middle">${cleanTitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const handleImageError = (e, type = 'profile', seed = '') => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = type === 'listing' ? getListingFallback(seed) : getProfileFallback(seed);
};
