const express = require('express');
const router = express.Router();
const {
  likeUser,
  passUser,
  getLikesReceived,
  getLikesSent,
  getSuperLikes,
} = require('../controllers/likeController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/like/:userId', likeUser);
router.post('/pass/:userId', passUser);
router.get('/received', getLikesReceived);
router.get('/sent', getLikesSent);
router.get('/superlikes', getSuperLikes);

module.exports = router;
