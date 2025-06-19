const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const BookingController = require('../controllers/BookingController');
const {
  validateCreateBooking,
  canCreateBooking,
  canViewOwnBookings,
  canViewAllBookings,
  canCancelBooking,
} = require('../models/BookingValidation');

// Create a new booking (student or admin)
router.post(
  '/',
  authenticateToken,
  canCreateBooking,
  validateCreateBooking,
  BookingController.createBooking
);

// Get all bookings (admin only)
router.get(
  '/all',
  authenticateToken,
  canViewAllBookings,
  BookingController.getAllBookings
);

// Get user's own bookings (student or admin)
router.get(
  '/',
  authenticateToken,
  canViewOwnBookings,
  BookingController.getOwnBookings
);

// Cancel a booking (student for own bookings or admin)
router.delete(
  '/:booking_id',
  authenticateToken,
  canCancelBooking,
  BookingController.cancelBooking
);

module.exports = router;