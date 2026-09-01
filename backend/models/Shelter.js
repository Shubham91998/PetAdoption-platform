const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema(
  {
    // Basic Info
    shelterName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    alternatePhone: {
      type: String,
    },

    // Location & Address
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },
    website: {
      type: String,
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },

    // Shelter Details
    description: {
      type: String,
      required: true,
    },
    story: {
      type: String,
    },
    foundedYear: {
      type: Number,
    },
    registrationNumber: {
      type: String,
    },
    licenseNumber: {
      type: String,
    },

    // Media
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    gallery: [
      {
        url: String,
        caption: String,
        type: {
          type: String,
          enum: ["image", "video"],
          default: "image",
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Facilities & Services
    facilities: [
      {
        type: String,
        enum: [
          "veterinary_care",
          "grooming",
          "training",
          "vaccination",
          "neutering",
          "daycare",
          "boarding",
          "adoption_support",
          "emergency_care",
        ],
      },
    ],

    // Operating Hours
    operatingHours: {
      monday: { open: String, close: String, closed: { type: Boolean, default: false } },
      tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
      wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
      thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
      friday: { open: String, close: String, closed: { type: Boolean, default: false } },
      saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
      sunday: { open: String, close: String, closed: { type: Boolean, default: false } },
    },

    // Adoption Process
    adoptionProcess: {
      steps: [String],
      requirements: [String],
      fee: Number,
      estimatedTime: String,
    },

    // Available Pets (references to existing Pet model)
    availablePets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],

    // Posts/Updates
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShelterPost",
      },
    ],

    // Reviews
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShelterReview",
      },
    ],

    // Stats
    totalAdoptions: {
      type: Number,
      default: 0,
    },
    totalAnimalsRescued: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },

    // Verification
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationDocuments: [
      {
        type: String,
        url: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },
    accountType: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    // Donation/Support Details
    donationDetails: {
      bankName: String,
      accountNumber: String,
      ifscCode: String,
      upiId: String,
      paypalEmail: String,
    },

    // Admin Notes
    adminNotes: String,
  },
  {
    timestamps: true,
  }
);

// Create a geospatial index for location-based queries
shelterSchema.index({ "coordinates": "2dsphere" });
shelterSchema.index({ shelterName: 1 });
shelterSchema.index({ city: 1, state: 1 });

const Shelter = mongoose.models.Shelter || mongoose.model("Shelter", shelterSchema);

module.exports = Shelter;
