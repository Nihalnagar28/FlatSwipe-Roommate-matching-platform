const express = require('express');
const router = express.Router();
const {
  createMeetup,
  respondToMeetup,
  getMeetups,
  updateChecklist,
  cancelMeetup,
} = require('../controllers/meetupController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createMeetup);
router.put('/:meetupId/respond', respondToMeetup);
router.get('/match/:matchId', getMeetups);
router.put('/:meetupId/checklist', updateChecklist);
router.put('/:meetupId/cancel', cancelMeetup);

module.exports = router;
