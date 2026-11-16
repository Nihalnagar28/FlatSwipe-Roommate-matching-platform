const express = require('express');
const router = express.Router();
const { getMatches, getMatch, unmatch } = require('../controllers/matchController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getMatches);
router.get('/:matchId', getMatch);
router.put('/unmatch/:matchId', unmatch);

module.exports = router;
