// backend/controllers/chatController.js
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Provider = require('../models/Provider');

// Get or create conversation
exports.getOrCreateConversation = async (req, res) => {
  try {
    const { providerId } = req.params;
    const provider = await Provider.findById(providerId);
    
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, provider.userId] }
    }).populate('participants', 'name email')
      .populate('provider', 'fullName profilePhoto');

    if (!conversation) {
      conversation = new Conversation({
        participants: [req.user.id, provider.userId],
        provider: providerId
      });
      await conversation.save();
      await conversation.populate('participants', 'name email');
      await conversation.populate('provider', 'fullName profilePhoto');
    }

    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's conversations
exports.getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id
    })
    .populate('participants', 'name email')
    .populate('provider', 'fullName profilePhoto')
    .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get conversation messages
exports.getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    if (!conversation.participants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const messages = await Message.find({ conversation: conversationId })
      .sort({ createdAt: 1 });
    
    // Mark messages as read
    await Message.updateMany(
      { conversation: conversationId, receiver: req.user.id, read: false },
      { read: true, readAt: new Date() }
    );

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send message (called via Socket.IO)
exports.sendMessage = async (data) => {
  try {
    const { conversationId, senderId, receiverId, message } = data;
    
    const newMessage = new Message({
      conversation: conversationId,
      sender: senderId,
      receiver: receiverId,
      message
    });
    
    await newMessage.save();
    
    // Update conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message,
      lastMessageTime: new Date(),
      updatedAt: new Date()
    });
    
    return newMessage;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};