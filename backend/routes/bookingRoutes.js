// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.post('/:providerId', protect, bookingController.createBooking);
router.get('/user/my-bookings', protect, bookingController.getUserBookings);
router.get('/provider/my-bookings', protect, bookingController.getProviderBookings);
router.put('/:id/status', protect, bookingController.updateBookingStatus);
router.put('/:id/cancel', protect, bookingController.cancelBooking);

module.exports = router;