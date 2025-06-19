const db = require('../config/db');

const MessagesModel = {
  create: async ({ sender_id, receiver_id, hostel_id, content }) => {
    const [result] = await db.query(
      'INSERT INTO messages (sender_id, receiver_id, hostel_id, content) VALUES (?, ?, ?, ?)',
      [sender_id, receiver_id, hostel_id, content]
    );
    return { id: result.insertId };
  },

  findByUser: async (user_id) => {
    const [messages] = await db.query(
      `
      SELECT m.id, m.sender_id, us.username AS sender_username, m.receiver_id, ur.username AS receiver_username,
             m.hostel_id, h.name AS hostel_name, m.content, m.sent_at
      FROM messages m
      JOIN users us ON m.sender_id = us.id
      JOIN users ur ON m.receiver_id = ur.id
      JOIN Hostels h ON m.hostel_id = h.id
      WHERE m.sender_id = ? OR m.receiver_id = ?
      ORDER BY m.sent_at DESC
      `,
      [user_id, user_id]
    );
    return messages;
  },

  findAll: async () => {
    const [messages] = await db.query(
      `
      SELECT m.id, m.sender_id, us.username AS sender_username, m.receiver_id, ur.username AS receiver_username,
             m.hostel_id, h.name AS hostel_name, m.content, m.sent_at
      FROM messages m
      JOIN users us ON m.sender_id = us.id
      JOIN users ur ON m.receiver_id = ur.id
      JOIN Hostels h ON m.hostel_id = h.id
      ORDER BY m.sent_at DESC
      `
    );
    return messages;
  },

  findById: async (message_id) => {
    const [messages] = await db.query(
      `
      SELECT m.id, m.sender_id, us.username AS sender_username, m.receiver_id, ur.username AS receiver_username,
             m.hostel_id, h.name AS hostel_name, m.content, m.sent_at
      FROM messages m
      JOIN users us ON m.sender_id = us.id
      JOIN users ur ON m.receiver_id = ur.id
      JOIN Hostels h ON m.hostel_id = h.id
      WHERE m.id = ?
      `,
      [message_id]
    );
    return messages[0];
  },
};

module.exports = MessagesModel;