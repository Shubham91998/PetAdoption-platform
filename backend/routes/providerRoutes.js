// backend/routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/multer');

router.post('/apply', protect, upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'governmentId', maxCount: 1 },
  { name: 'certificates', maxCount: 5 }
]), providerController.applyForProvider);

router.get('/applications', protect, admin, providerController.getProviderApplications);
router.put('/applications/:id/approve', protect, admin, providerController.approveProvider);
router.put('/applications/:id/reject', protect, admin, providerController.rejectProvider);
router.get('/nearby', providerController.getNearbyProviders);
router.get('/search', providerController.searchProviders);
router.get('/:id', providerController.getProviderById);
router.put('/dashboard', protect, providerController.updateProviderDashboard);
// Add these routes to your existing providerRoutes.js

// Get current provider profile
router.get('/me', protect, providerController.getCurrentProvider);

// Update provider profile
router.put('/profile', protect, providerController.updateProviderProfile);

// Get provider statistics
router.get('/stats', protect, providerController.getProviderStats);
module.exports = router;