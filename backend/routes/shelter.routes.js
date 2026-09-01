const express = require("express");
const {
  shelterRegister,
  shelterLogin,
  getShelterProfile,
  updateShelterProfile,
  shelterLogout,
} = require("../controllers/shelter.auth.controller");
const {
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
} = require("../controllers/shelter.controller");
const {
  isShelterAuthenticated,
  isShelterVerified,
  isShelterOwner,
} = require("../middleware/shelter.auth.middleware");

const router = express.Router();

// ==================== AUTH ROUTES ====================
// Public routes
router.post("/register", shelterRegister);
router.post("/login", shelterLogin);
router.post("/logout", shelterLogout);

// Protected routes
router.get("/profile", isShelterAuthenticated, getShelterProfile);
router.put("/profile", isShelterAuthenticated, updateShelterProfile);

// ==================== PUBLIC SHELTER LISTING ROUTES ====================
router.get("/list", getAllShelters);
router.get("/nearby", getNearByShelters);
router.get("/:shelterId", getShelterById);

// ==================== SHELTER MEDIA ROUTES ====================
router.post("/media/upload", isShelterAuthenticated, uploadShelterMedia);

// ==================== SHELTER POSTS ROUTES ====================
router.post("/posts/create", isShelterAuthenticated, createShelterPost);
router.get("/:shelterId/posts", getShelterPosts);
router.delete("/posts/:postId", isShelterAuthenticated, deleteShelterPost);

// ==================== SHELTER AVAILABLE PETS ROUTES ====================
router.post("/pets/add", isShelterAuthenticated, addAvailablePet);
router.delete("/pets/:petId", isShelterAuthenticated, removeAvailablePet);

// ==================== SHELTER REVIEWS ROUTES ====================
router.get("/:shelterId/reviews", getShelterReviews);
router.post("/:shelterId/reviews/create", isShelterAuthenticated, createShelterReview);

// ==================== SHELTER DASHBOARD ROUTES ====================
router.get("/dashboard/stats", isShelterAuthenticated, getShelterDashboardStats);

module.exports = router;
