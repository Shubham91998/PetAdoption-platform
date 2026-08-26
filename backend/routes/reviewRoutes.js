// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// Create review
router.post('/:bookingId', protect, reviewController.createReview);

// Get provider reviews
router.get('/provider/:providerId', reviewController.getProviderReviews);

// Get user reviews
router.get('/user/my-reviews', protect, async (req, res) => {
  try {
    const Review = require('../models/Review');
    const reviews = await Review.find({ user: req.user.id })
      .populate('provider', 'fullName profilePhoto')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete review (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const Review = require('../models/Review');
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;