import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Request interceptor to attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('flatmate_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for session expiry handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized and on a protected route, clear token
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        localStorage.removeItem('flatmate_token');
        localStorage.removeItem('flatmate_user');
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  logout: () => API.get('/auth/logout'),
  forgotPassword: (data) => API.post('/auth/forgotpassword', data),
  resetPassword: (token, data) => API.put(`/auth/resetpassword/${token}`, data),
  verifyEmail: (token) => API.get(`/auth/verifyemail/${token}`),
  updatePassword: (data) => API.put('/auth/updatepassword', data),
};

export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile/update', data),
  updateOnboarding: (data) => API.put('/users/onboarding', data),
  completeOnboarding: (data) => API.put('/users/onboarding/complete', data),
  uploadPicture: (image) => API.put('/users/upload-picture', { image }),
  getDashboardStats: () => API.get('/users/dashboard'),
};

export const preferenceAPI = {
  getPreferences: () => API.get('/preferences'),
  updatePreferences: (data) => API.put('/preferences', data),
};

export const discoveryAPI = {
  getProfiles: (params) => API.get('/discovery', { params }),
};

export const likeAPI = {
  likeUser: (userId, type = 'like') => API.post(`/likes/like/${userId}`, { type }),
  passUser: (userId) => API.post(`/likes/pass/${userId}`),
  getReceivedLikes: () => API.get('/likes/received'),
  getSentLikes: () => API.get('/likes/sent'),
  getSuperLikes: () => API.get('/likes/superlikes'),
};

export const matchAPI = {
  getMatches: () => API.get('/matches'),
  getMatch: (matchId) => API.get(`/matches/${matchId}`),
  unmatch: (matchId) => API.put(`/matches/unmatch/${matchId}`),
};

export const messageAPI = {
  getMessages: (matchId, params) => API.get(`/messages/${matchId}`, { params }),
  sendMessage: (matchId, data) => API.post(`/messages/${matchId}`, data),
  markRead: (matchId) => API.put(`/messages/read/${matchId}`),
  getUnreadCount: () => API.get('/messages/unread/count'),
};

export const listingAPI = {
  getListings: (params) => API.get('/listings', { params }),
  getListing: (id) => API.get(`/listings/${id}`),
  createListing: (data) => API.post('/listings', data),
  updateListing: (id, data) => API.put(`/listings/${id}`, data),
  deleteListing: (id) => API.delete(`/listings/${id}`),
  saveListing: (id) => API.put(`/listings/save/${id}`),
  getMySavedListings: () => API.get('/listings/saved/me'),
  getMyListings: () => API.get('/listings/my/listings'),
};

export const meetupAPI = {
  createMeetup: (data) => API.post('/meetups', data),
  respondToMeetup: (meetupId, data) => API.put(`/meetups/${meetupId}/respond`, data),
  getMeetups: (matchId) => API.get(`/meetups/match/${matchId}`),
  updateChecklist: (meetupId, data) => API.put(`/meetups/${meetupId}/checklist`, data),
  cancelMeetup: (meetupId) => API.put(`/meetups/${meetupId}/cancel`),
};

export const notificationAPI = {
  getNotifications: (params) => API.get('/notifications', { params }),
  markRead: (id) => API.put(`/notifications/${id}/read`),
  markAllRead: () => API.put('/notifications/read-all'),
  getUnreadCount: () => API.get('/notifications/unread/count'),
};

export const verificationAPI = {
  requestVerification: (data) => API.post('/verification/request', data),
  getStatus: () => API.get('/verification/status'),
};

export const adminAPI = {
  getDashboardStats: () => API.get('/admin/dashboard'),
  getUsers: (params) => API.get('/admin/users', { params }),
  updateUserStatus: (id, data) => API.put(`/admin/users/${id}/status`, data),
  getReports: () => API.get('/admin/reports'),
  resolveReport: (id, data) => API.put(`/admin/reports/${id}`, data),
  getVerifications: () => API.get('/admin/verifications'),
  approveVerification: (id) => API.put(`/admin/verifications/${id}/approve`),
  rejectVerification: (id, data) => API.put(`/admin/verifications/${id}/reject`, data),
  getListings: (params) => API.get('/admin/listings', { params }),
  toggleListingVerification: (id) => API.put(`/admin/listings/${id}/verify`),
};

export default API;
