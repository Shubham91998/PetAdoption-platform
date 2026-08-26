// backend/controllers/bookingController.js
const Booking = require('../models/Booking');
const Provider = require('../models/Provider');

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      user: req.user.id,
      provider: req.params.providerId
    };

    const booking = new Booking(bookingData);
    await booking.save();

    // Update provider's total bookings
    await Provider.findByIdAndUpdate(req.params.providerId, {
      $inc: { totalBookings: 1 }
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('provider', 'fullName profilePhoto')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get provider's bookings
exports.getProviderBookings = async (req, res) => {
  try {
    const provider = await Provider.findOne({ userId: req.user.id });
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const bookings = await Booking.find({ provider: provider._id })
      .populate('user', 'name email')
      .sort({ bookingDate: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking status (Provider)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    if (status === 'Completed') {
      booking.completedAt = new Date();
    }
    await booking.save();

    res.json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking (User)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'Cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};