const express = require('express');
const router = express.Router();
const { getDiscoverProfiles } = require('../controllers/discoveryController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getDiscoverProfiles);

module.exports = router;
