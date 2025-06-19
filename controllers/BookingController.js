const db = require('../config/db');

const BookingController = {
  // Create a new booking
  createBooking: async (req, res) => {
    const { hostel_id, contact, email_address } = req.body;
    const user_id = req.user.id; // From authenticateToken middleware

    // Validate input
    if (!hostel_id || !contact || !email_address) {
      return res.status(400).json({ error: 'Hostel ID, contact, and email address are required' });
    }

    try {
      // Check if hostel exists
      const [hostel] = await db.query('SELECT id FROM Hostels WHERE id = ?', [hostel_id]);
      if (hostel.length === 0) {
        return res.status(404).json({ error: 'Hostel not found' });
      }

      // Check if user exists
      const [user] = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
      if (user.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Insert booking
      const [result] = await db.query(
        'INSERT INTO Booking (user_id, hostel_id, contact, email_address) VALUES (?, ?, ?, ?)',
        [user_id, hostel_id, contact, email_address]
      );

      res.status(201).json({
        booking_id: result.insertId,
        message: 'Booking created successfully',
      });
    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },

  // Get all bookings (admin only)
  getAllBookings: async (req, res) => {
    try {
      const [bookings] = await db.query(`
        SELECT b.booking_id, b.user_id, u.username, b.hostel_id, h.name AS hostel_name, 
               b.contact, b.email_address
        FROM Booking b
        JOIN users u ON b.user_id = u.id
        JOIN Hostels h ON b.hostel_id = h.id
      `);
      res.json({
        total: bookings.length,
        data: bookings,
      });
    } catch (error) {
      console.error('Get bookings error:', error);
      res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
  },

  // Get user's own bookings
  getOwnBookings: async (req, res) => {
    const user_id = req.user.id; // From authenticateToken middleware

    try {
      const [bookings] = await db.query(`
        SELECT b.booking_id, b.user_id, u.username, b.hostel_id, h.name AS hostel_name, 
               b.contact, b.email_address
        FROM Booking b
        JOIN users u ON b.user_id = u.id
        JOIN Hostels h ON b.hostel_id = h.id
        WHERE b.user_id = ?
      `, [user_id]);
      res.json({
        total: bookings.length,
        data: bookings,
      });
    } catch (error) {
      console.error('Get own bookings error:', error);
      res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
  },

  // Cancel a booking
  cancelBooking: async (req, res) => {
    const { booking_id } = req.params;
    const user_id = req.user.id;
    const user_role = req.user.role;

    try {
      // Check if booking exists
      const [booking] = await db.query('SELECT user_id FROM Booking WHERE booking_id = ?', [booking_id]);
      if (booking.length === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Check if user is allowed to cancel (student owns it or admin)
      if (user_role !== 'admin' && booking[0].user_id !== user_id) {
        return res.status(403).json({ error: 'Not authorized to cancel this booking' });
      }

      // Delete booking
      await db.query('DELETE FROM Booking WHERE booking_id = ?', [booking_id]);
      res.json({ message: 'Booking canceled successfully' });
    } catch (error) {
      console.error('Cancel booking error:', error);
      res.status(500).json({ error: 'Failed to cancel booking' });
    }
  },
};

module.exports = BookingController;