const { hasPermission } = require('../middleware/roleCheck');

// Middleware to validate booking creation input
const validateCreateBooking = (req, res, next) => {
  const { hostel_id, contact, email_address } = req.body;

  if (!hostel_id || !contact || !email_address) {
    return res.status(400).json({ error: 'Hostel ID, contact, and email address are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_address)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Basic contact validation (e.g., Ugandan phone number format)
  const contactRegex = /^0[0-9]{9}$/;
  if (!contactRegex.test(contact)) {
    return res.status(400).json({ error: 'Invalid contact number. Must be a 10-digit Ugandan number starting with 0' });
  }

  next();
};

// Export permission-based middlewares
module.exports = {
  validateCreateBooking,
  canCreateBooking: hasPermission('CREATE_BOOKING'),
  canViewOwnBookings: hasPermission('VIEW_OWN_BOOKINGS'),
  canViewAllBookings: hasPermission('VIEW_ALL_BOOKINGS'),
  canCancelBooking: hasPermission('CANCEL_BOOKING'),
};