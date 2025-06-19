const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const MessagesController = require('../controllers/MessagesController');
const {
  validateSendMessage,
  canSendMessage,
  canViewOwnMessages,
  canViewAllMessages,
} = require('../middleware/Messages');

// Send a new message (student, landlord, admin)
router.post(
  '/',
  authenticateToken,
  canSendMessage,
  validateSendMessage,
  MessagesController.sendMessage
);

// Get user's own messages (student, landlord, admin)
router.get(
  '/',
  authenticateToken,
  canViewOwnMessages,
  MessagesController.getOwnMessages
);

// Get all messages (admin only)
router.get(
  '/all',
  authenticateToken,
  canViewAllMessages,
  MessagesController.getAllMessages
);

module.exports = router;