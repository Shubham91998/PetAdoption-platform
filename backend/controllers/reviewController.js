// backend/controllers/reviewController.js
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const Provider = require('../models/Provider');

// Create review
exports.createReview = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rating, review } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to review this booking' });
    }

    // Check if booking is completed
    if (booking.status !== 'Completed') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: 'Already reviewed this booking' });
    }

    // Create review
    const newReview = new Review({
      booking: bookingId,
      user: req.user.id,
      provider: booking.provider,
      rating,
      review
    });

    await newReview.save();

    // Update provider rating
    const allReviews = await Review.find({ provider: booking.provider });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / allReviews.length;
    
    await Provider.findByIdAndUpdate(booking.provider, {
      rating: Number(avgRating.toFixed(1)),
      totalReviews: allReviews.length
    });

    res.status(201).json({ 
      message: 'Review submitted successfully', 
      review: newReview 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get provider reviews
exports.getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;
    const reviews = await Review.find({ provider: providerId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user reviews
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('provider', 'fullName profilePhoto')
      .populate('booking', 'service bookingDate')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;
    
    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    if (existingReview.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    existingReview.rating = rating || existingReview.rating;
    existingReview.review = review || existingReview.review;
    await existingReview.save();
    
    // Update provider rating
    const allReviews = await Review.find({ provider: existingReview.provider });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / allReviews.length;
    
    await Provider.findByIdAndUpdate(existingReview.provider, {
      rating: Number(avgRating.toFixed(1))
    });
    
    res.json({ message: 'Review updated successfully', review: existingReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete review (Admin only)
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    await review.deleteOne();
    
    // Update provider rating
    const allReviews = await Review.find({ provider: review.provider });
    const avgRating = allReviews.length > 0 
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;
    
    await Provider.findByIdAndUpdate(review.provider, {
      rating: Number(avgRating.toFixed(1)),
      totalReviews: allReviews.length
    });
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};