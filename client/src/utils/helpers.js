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
  if (score >= 85) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (score >= 70) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
  if (score >= 50) return 'bg-amber-100 text-amber-800 border-amber-200';
  return 'bg-rose-100 text-rose-800 border-rose-200';
};

export const getCompatibilityGradient = (score) => {
  if (score >= 85) return 'from-emerald-500 to-teal-600';
  if (score >= 70) return 'from-indigo-500 to-purple-600';
  if (score >= 50) return 'from-amber-500 to-orange-600';
  return 'from-rose-500 to-red-600';
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
