const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
  saveListing,
  getMySavedListings,
  getMyListings,
} = require('../controllers/listingController');
const { protect } = require('../middleware/auth');

router.get('/', getListings);
router.get('/saved/me', protect, getMySavedListings);
router.get('/my/listings', protect, getMyListings);
router.get('/:id', getListing);
router.post('/', protect, createListing);
router.put('/:id', protect, updateListing);
router.delete('/:id', protect, deleteListing);
router.put('/save/:id', protect, saveListing);

module.exports = router;
