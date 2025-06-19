// backend/controllers/userController.js
const db = require('../config/db');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const [users] = await db.query(`
        SELECT id, username, email, role, contact
        FROM users
      `);
      res.json({
        total: users.length,
        data: users,
      });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  },

  // Update user role
  updateUserRole: async (req, res) => {
    const { user_id } = req.params;
    const { role } = req.body;

    // Validate role
    const validRoles = ['student', 'landlord', 'admin'];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be student, landlord, or admin' });
    }

    try {
      const [user] = await db.query('SELECT user_id FROM users WHERE user_id = ?', [user_id]);
      if (user.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      await db.query('UPDATE users SET role = ? WHERE user_id = ?', [role, user_id]);
      res.json({ message: 'User role updated successfully' });
    } catch (error) {
      console.error('Update user role error:', error);
      res.status(500).json({ error: 'Failed to update user role' });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    const { user_id } = req.params;

    try {
      const [user] = await db.query('SELECT user_id FROM users WHERE user_id = ?', [user_id]);
      if (user.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      await db.query('DELETE FROM users WHERE user_id = ?', [user_id]);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },
};

module.exports = userController;