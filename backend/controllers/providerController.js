// backend/controllers/providerController.js
const Provider = require('../models/Provider');
const cloudinary = require('cloudinary').v2;

// Apply to become a provider
exports.applyForProvider = async (req, res) => {
  try {
    const {
      fullName, email, phone, experience, specialization,
      servicesOffered, priceList, homeVisitAvailable, address,
      city, state, pincode, serviceRadius, lat, lng
    } = req.body;

    // Check if already applied
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ message: 'Already applied or registered as provider' });
    }

    // Upload files to Cloudinary
    const profilePhoto = req.files.profilePhoto[0].path;
    const governmentId = req.files.governmentId[0].path;
    const certificates = req.files.certificates ? req.files.certificates.map(f => f.path) : [];

    const provider = new Provider({
      userId: req.user.id,
      fullName,
      email,
      phone,
      profilePhoto,
      governmentId,
      certificates,
      experience,
      specialization: JSON.parse(specialization),
      servicesOffered: JSON.parse(servicesOffered),
      priceList: JSON.parse(priceList),
      homeVisitAvailable,
      address,
      city,
      state,
      pincode,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      },
      serviceRadius,
      applicationStatus: 'Pending',
      isVerified: false
    });

    await provider.save();
    res.status(201).json({ message: 'Application submitted successfully', provider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all provider applications (Admin only)
exports.getProviderApplications = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { applicationStatus: status } : {};
    const providers = await Provider.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve provider application (Admin only)
exports.approveProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    provider.applicationStatus = 'Approved';
    provider.isVerified = true;
    await provider.save();

    res.json({ message: 'Provider approved successfully', provider });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject provider application (Admin only)
exports.rejectProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    provider.applicationStatus = 'Rejected';
    provider.isVerified = false;
    await provider.save();

    res.json({ message: 'Provider rejected', provider });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get nearby verified providers
exports.getNearbyProviders = async (req, res) => {
  try {
    const { lat, lng, radius = 10, page = 1, limit = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude required' });
    }

    const providers = await Provider.find({
      isVerified: true,
      applicationStatus: 'Approved',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius) * 1000 // Convert km to meters
        }
      }
    })
    .select('-governmentId -certificates')
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

    // Calculate distance for each provider
    const providersWithDistance = providers.map(provider => {
      const distance = calculateDistance(
        parseFloat(lat), parseFloat(lng),
        provider.location.coordinates[1], provider.location.coordinates[0]
      );
      return { ...provider.toObject(), distance: distance.toFixed(1) };
    });

    res.json({
      providers: providersWithDistance,
      page: parseInt(page),
      total: providers.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search providers
exports.searchProviders = async (req, res) => {
  try {
    const { q, city, service, minRating } = req.query;
    let query = { isVerified: true, applicationStatus: 'Approved' };

    if (q) {
      query.$or = [
        { fullName: { $regex: q, $options: 'i' } },
        { address: { $regex: q, $options: 'i' } },
        { city: { $regex: q, $options: 'i' } }
      ];
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (service) {
      query.servicesOffered = service;
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    const providers = await Provider.find(query)
      .select('-governmentId -certificates')
      .sort({ rating: -1, totalBookings: -1 });

    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single provider by ID
exports.getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id)
      .select('-governmentId');
    
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update provider dashboard
exports.updateProviderDashboard = async (req, res) => {
  try {
    const { availability } = req.body;
    const provider = await Provider.findOne({ userId: req.user.id });

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    if (availability) provider.availability = availability;
    await provider.save();

    res.json({ message: 'Updated successfully', provider });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Add these to your existing providerController.js

// Get current provider profile
exports.getCurrentProvider = async (req, res) => {
  try {
    const provider = await Provider.findOne({ userId: req.user.id })
      .select('-governmentId');
    
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    
    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update provider profile
exports.updateProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findOne({ userId: req.user.id });
    
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    
    const allowedUpdates = [
      'fullName', 'phone', 'experience', 'specialization',
      'servicesOffered', 'priceList', 'homeVisitAvailable',
      'address', 'city', 'state', 'pincode', 'serviceRadius'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        provider[field] = req.body[field];
      }
    });
    
    await provider.save();
    res.json({ message: 'Profile updated successfully', provider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get provider statistics
exports.getProviderStats = async (req, res) => {
  try {
    const provider = await Provider.findOne({ userId: req.user.id });
    
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    
    const Booking = require('../models/Booking');
    const stats = {
      totalBookings: provider.totalBookings,
      totalReviews: provider.totalReviews,
      rating: provider.rating,
      pendingBookings: await Booking.countDocuments({ 
        provider: provider._id, 
        status: 'Pending' 
      }),
      completedBookings: await Booking.countDocuments({ 
        provider: provider._id, 
        status: 'Completed' 
      }),
      revenue: await Booking.aggregate([
        { $match: { provider: provider._id, status: 'Completed' } },
        { $group: { _id: null, total: { $sum: '$price' } } }
      ])
    };
    
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};