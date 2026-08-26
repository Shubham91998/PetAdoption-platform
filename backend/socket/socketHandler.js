// backend/socket/socketHandler.js
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join user's personal room
    socket.on('join', (userId) => {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    // Send message
    socket.on('send_message', async (data) => {
      try {
        const { conversationId, senderId, receiverId, message } = data;

        // Save message to database
        const newMessage = new Message({
          conversation: conversationId,
          sender: senderId,
          receiver: receiverId,
          message
        });
        await newMessage.save();

        // Update conversation last message
        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message,
          lastMessageTime: new Date(),
          updatedAt: new Date()
        });

        // Emit to receiver
        io.to(`user_${receiverId}`).emit('receive_message', {
          conversationId,
          message: newMessage,
          senderId
        });

        // Acknowledge to sender
        socket.emit('message_sent', newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('typing', (data) => {
      const { receiverId, conversationId, isTyping } = data;
      io.to(`user_${receiverId}`).emit('user_typing', {
        conversationId,
        isTyping,
        senderId: socket.id
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};