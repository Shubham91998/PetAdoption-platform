// backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

// Get or create conversation
router.post('/conversation/:providerId', protect, chatController.getOrCreateConversation);

// Get user's conversations
router.get('/conversations', protect, chatController.getUserConversations);

// Get conversation messages
router.get('/messages/:conversationId', protect, chatController.getConversationMessages);

// Mark messages as read
router.put('/read/:conversationId', protect, async (req, res) => {
  try {
    const Message = require('../models/Message');
    await Message.updateMany(
      { conversation: req.params.conversationId, receiver: req.user.id, read: false },
      { read: true, readAt: new Date() }
    );
    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;