const mongoose = require("mongoose");

const shelterPostSchema = new mongoose.Schema(
  {
    shelter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    media: [
      {
        url: String,
        type: {
          type: String,
          enum: ["image", "video"],
          default: "image",
        },
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        userName: String,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    category: {
      type: String,
      enum: ["update", "event", "success_story", "appeal", "news"],
      default: "update",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

shelterPostSchema.index({ shelter: 1 });
shelterPostSchema.index({ createdAt: -1 });
shelterPostSchema.index({ isPublished: 1 });

const ShelterPost =
  mongoose.models.ShelterPost ||
  mongoose.model("ShelterPost", shelterPostSchema);

module.exports = ShelterPost;
