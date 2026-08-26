// backend/models/Provider.js
const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: true
  },
  governmentId: {
    type: String,
    required: true
  },
  certificates: [{
    type: String
  }],
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  specialization: [{
    type: String
  }],
  servicesOffered: [{
    type: String,
    enum: ['Basic Bath', 'Full Grooming', 'Hair Trimming', 'Nail Clipping', 'Ear Cleaning', 'Tick & Flea Treatment', 'Spa Treatment']
  }],
  priceList: {
    type: Map,
    of: Number,
    required: true
  },
  homeVisitAvailable: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    }
  },
  serviceRadius: {
    type: Number,
    required: true,
    min: 1,
    max: 50,
    default: 10
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  applicationStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'Offline'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

providerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Provider', providerSchema);