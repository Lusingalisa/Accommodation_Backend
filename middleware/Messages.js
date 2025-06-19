const { hasPermission } = require('./roleCheck');

const validateSendMessage = (req, res, next) => {
  const { receiver_id, hostel_id, content } = req.body;

  if (!receiver_id || !hostel_id || !content) {
    return res.status(400).json({ error: 'Receiver ID, hostel ID, and content are required' });
  }

  if (typeof content !== 'string' || content.length < 1 || content.length > 1000) {
    return res.status(400).json({ error: 'Content must be a string between 1 and 1000 characters' });
  }

  if (!Number.isInteger(Number(receiver_id)) || Number(receiver_id) <= 0) {
    return res.status(400).json({ error: 'Invalid receiver ID' });
  }

  if (!Number.isInteger(Number(hostel_id)) || Number(hostel_id) <= 0) {
    return res.status(400).json({ error: 'Invalid hostel ID' });
  }

  next();
};

module.exports = {
  validateSendMessage,
  canSendMessage: hasPermission('SEND_MESSAGE'),
  canViewOwnMessages: hasPermission('VIEW_OWN_MESSAGES'),
  canViewAllMessages: hasPermission('VIEW_ALL_MESSAGES'),
};