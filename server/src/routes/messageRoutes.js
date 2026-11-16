const express = require('express');
const router = express.Router();
const {
  getMessages,
  sendMessage,
  markAsRead,
  getUnreadCount,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/unread/count', getUnreadCount);
router.get('/:matchId', getMessages);
router.post('/:matchId', sendMessage);
router.put('/read/:matchId', markAsRead);

module.exports = router;
