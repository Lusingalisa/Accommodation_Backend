const MessagesModel = require('../models/MessagesModel');
const db = require('../config/db');

const MessagesController = {
  // Send a new message
  sendMessage: async (req, res) => {
    const { receiver_id, hostel_id, content } = req.body;
    const sender_id = req.user.id; // From authenticateToken middleware

    if (!receiver_id || !hostel_id || !content) {
      return res.status(400).json({ error: 'Receiver ID, hostel ID, and content are required' });
    }

    try {
      // Check if receiver exists
      const [receiver] = await db.query('SELECT id FROM users WHERE id = ?', [receiver_id]);
      if (receiver.length === 0) {
        return res.status(404).json({ error: 'Receiver not found' });
      }

      // Check if hostel exists
      const [hostel] = await db.query('SELECT id FROM Hostels WHERE id = ?', [hostel_id]);
      if (hostel.length === 0) {
        return res.status(404).json({ error: 'Hostel not found' });
      }

      // Create message
      const { id } = await MessagesModel.create({ sender_id, receiver_id, hostel_id, content });

      res.status(201).json({
        message_id: id,
        message: 'Message sent successfully',
      });
    } catch (error) {
      console.error('Send message error:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  },

  // Get all messages for a user (sent or received)
  getOwnMessages: async (req, res) => {
    const user_id = req.user.id;

    try {
      const messages = await MessagesModel.findByUser(user_id);
      res.json({
        total: messages.length,
        data: messages,
      });
    } catch (error) {
      console.error('Get own messages error:', error);
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  },

  // Get all messages (admin only)
  getAllMessages: async (req, res) => {
    try {
      const messages = await MessagesModel.findAll();
      res.json({
        total: messages.length,
        data: messages,
      });
    } catch (error) {
      console.error('Get all messages error:', error);
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  },
};

module.exports = MessagesController;