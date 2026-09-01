const Shelter = require("../models/Shelter");
const ShelterPost = require("../models/ShelterPost");
const ShelterReview = require("../models/ShelterReview");
const Pet = require("../models/pet.model.js");

// Get all shelters with pagination and search
const getAllShelters = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", city = "", sortBy = "createdAt" } = req.query;
    const skip = (page - 1) * limit;

    let filter = { isActive: true, verificationStatus: "approved" };

    if (search) {
      filter.$or = [
        { shelterName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    const shelters = await Shelter.find(filter)
      .sort({ [sortBy]: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Shelter.countDocuments(filter);

    res.status(200).json({
      message: "Shelters fetched successfully",
      shelters,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching shelters:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get nearby shelters based on location (geospatial query)
const getNearByShelters = async (req, res) => {
  try {
    const { longitude, latitude, distance = 50 } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({ message: "Longitude and latitude are required" });
    }

    const shelters = await Shelter.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: distance * 1000, // Convert km to meters
        },
      },
      isActive: true,
      verificationStatus: "approved",
    });

    res.status(200).json({
      message: "Nearby shelters fetched successfully",
      count: shelters.length,
      shelters,
    });
  } catch (error) {
    console.error("Error fetching nearby shelters:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get single shelter by ID
const getShelterById = async (req, res) => {
  try {
    const { shelterId } = req.params;

    const shelter = await Shelter.findById(shelterId)
      .populate("posts")
      .populate("reviews")
      .populate("availablePets");

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    res.status(200).json({
      message: "Shelter details fetched successfully",
      shelter,
    });
  } catch (error) {
    console.error("Error fetching shelter:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Upload shelter images/media
const uploadShelterMedia = async (req, res) => {
  try {
    const shelterId = req.user?._id;
    const { mediaUrl, type = "image", caption } = req.body;

    if (!shelterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    // Check if it's profile or cover image
    const { imageType } = req.body;
    if (imageType === "profile") {
      shelter.profileImage = mediaUrl;
    } else if (imageType === "cover") {
      shelter.coverImage = mediaUrl;
    } else {
      // Add to gallery
      shelter.gallery.push({
        url: mediaUrl,
        type,
        caption,
      });
    }

    await shelter.save();

    res.status(200).json({
      message: "Media uploaded successfully",
      shelter,
    });
  } catch (error) {
    console.error("Error uploading media:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create shelter post
const createShelterPost = async (req, res) => {
  try {
    const shelterId = req.user?._id;
    const { title, content, category = "update", media = [] } = req.body;

    if (!shelterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    const newPost = new ShelterPost({
      shelter: shelterId,
      title,
      content,
      category,
      media,
    });

    await newPost.save();

    // Add post to shelter
    shelter.posts.push(newPost._id);
    await shelter.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get shelter posts
const getShelterPosts = async (req, res) => {
  try {
    const { shelterId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await ShelterPost.find({ shelter: shelterId, isPublished: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("shelter", "shelterName profileImage");

    const total = await ShelterPost.countDocuments({ shelter: shelterId, isPublished: true });

    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete shelter post
const deleteShelterPost = async (req, res) => {
  try {
    const shelterId = req.user?._id;
    const { postId } = req.params;

    if (!shelterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await ShelterPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Verify ownership
    if (post.shelter.toString() !== shelterId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    // Remove from shelter's posts array
    await Shelter.findByIdAndUpdate(shelterId, {
      $pull: { posts: postId },
    });

    await ShelterPost.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add available pet to shelter
const addAvailablePet = async (req, res) => {
  try {
    const shelterId = req.user?._id;
    const { petId } = req.body;

    if (!shelterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    // Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Check if already added
    if (shelter.availablePets.includes(petId)) {
      return res.status(400).json({ message: "Pet already added to this shelter" });
    }

    shelter.availablePets.push(petId);
    await shelter.save();

    res.status(200).json({
      message: "Pet added to shelter",
      shelter,
    });
  } catch (error) {
    console.error("Error adding pet:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove available pet from shelter
const removeAvailablePet = async (req, res) => {
  try {
    const shelterId = req.user?._id;
    const { petId } = req.params;

    if (!shelterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    shelter.availablePets = shelter.availablePets.filter((id) => id.toString() !== petId);
    await shelter.save();

    res.status(200).json({
      message: "Pet removed from shelter",
      shelter,
    });
  } catch (error) {
    console.error("Error removing pet:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get shelter reviews
const getShelterReviews = async (req, res) => {
  try {
    const { shelterId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const reviews = await ShelterReview.find({ shelter: shelterId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ShelterReview.countDocuments({ shelter: shelterId });

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create shelter review
const createShelterReview = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { shelterId } = req.params;
    const { rating, reviewText, adoptionExperience } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!rating || !reviewText) {
      return res.status(400).json({ message: "Rating and review text are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    // Get user details for review
    const User = require("../models/user.model.js");
    const user = await User.findById(userId);

    const newReview = new ShelterReview({
      shelter: shelterId,
      user: userId,
      userName: user?.fullname || "Anonymous",
      userImage: user?.profileImage,
      rating,
      reviewText,
      adoptionExperience: adoptionExperience || false,
    });

    await newReview.save();

    // Update shelter's average rating
    const allReviews = await ShelterReview.find({ shelter: shelterId });
    const avgRating = (
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    ).toFixed(2);

    shelter.reviews.push(newReview._id);
    shelter.averageRating = parseFloat(avgRating);
    shelter.totalReviews = allReviews.length;
    await shelter.save();

    res.status(201).json({
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get shelter dashboard stats
const getShelterDashboardStats = async (req, res) => {
  try {
    const shelterId = req.user?._id;

    if (!shelterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shelter = await Shelter.findById(shelterId)
      .populate("posts")
      .populate("reviews")
      .populate("availablePets");

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    const stats = {
      totalAnimalsRescued: shelter.totalAnimalsRescued,
      totalAdoptions: shelter.totalAdoptions,
      totalPosts: shelter.posts.length,
      totalReviews: shelter.totalReviews,
      averageRating: shelter.averageRating,
      availablePets: shelter.availablePets.length,
      isVerified: shelter.isVerified,
      verificationStatus: shelter.verificationStatus,
      accountType: shelter.accountType,
      joinDate: shelter.createdAt,
    };

    res.status(200).json({
      message: "Dashboard stats fetched successfully",
      stats,
      shelter: {
        _id: shelter._id,
        shelterName: shelter.shelterName,
        profileImage: shelter.profileImage,
        city: shelter.city,
        email: shelter.email,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllShelters,
  getNearByShelters,
  getShelterById,
  uploadShelterMedia,
  createShelterPost,
  getShelterPosts,
  deleteShelterPost,
  addAvailablePet,
  removeAvailablePet,
  getShelterReviews,
  createShelterReview,
  getShelterDashboardStats,
};
