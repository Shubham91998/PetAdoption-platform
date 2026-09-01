const mongoose = require("mongoose");

const shelterReviewSchema = new mongoose.Schema(
  {
    shelter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userImage: String,
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
    },
    adoptionExperience: {
      type: Boolean,
      default: false,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

shelterReviewSchema.index({ shelter: 1 });
shelterReviewSchema.index({ user: 1 });
shelterReviewSchema.index({ rating: -1 });

const ShelterReview =
  mongoose.models.ShelterReview ||
  mongoose.model("ShelterReview", shelterReviewSchema);

module.exports = ShelterReview;
