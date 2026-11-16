export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getCompatibilityBadgeColor = (score) => {
  if (score >= 85) return 'bg-[#E8EAE3] text-[#315C4C] border-[#315C4C]/20';
  if (score >= 70) return 'bg-[#E8EAE3] text-[#527565] border-[#527565]/20';
  if (score >= 50) return 'bg-[#D9A16A]/15 text-[#9A622A] border-[#D9A16A]/30';
  return 'bg-stone-100 text-[#737B74] border-[#E5E7E2]';
};

export const getCompatibilityGradient = (score) => {
  if (score >= 85) return 'from-[#315C4C] to-[#527565]';
  if (score >= 70) return 'from-[#527565] to-[#737B74]';
  if (score >= 50) return 'from-[#D9A16A] to-[#B37F4A]';
  return 'from-[#737B74] to-stone-400';
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - d) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
};

export const formatTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
