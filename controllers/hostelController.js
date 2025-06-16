const db = require('../config/db');

exports.getHostels = async (req, res) => {
  const { price_max = 500000, distance_max = 5 } = req.query;
  if (isNaN(price_max) || isNaN(distance_max)) {
    return res.status(400).json({ message: 'Invalid price or distance parameters' });
  }
  try {
    const [hostels] = await db.query(
      'SELECT * FROM hostels WHERE price_per_month <= ? AND distance_km <= ?',
      [parseInt(price_max), parseFloat(distance_max)]
    );
    const formattedHostels = hostels.map(hostel => ({
      ...hostel,
      amenities: hostel.amenities ? hostel.amenities.split(',') : []
    }));
    res.json(formattedHostels);
  } catch (err) {
    console.error('Get hostels error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addHostel = async (req, res) => {
  const { name, address, price_per_month, distance_km, amenities, latitude, longitude } = req.body;
  if (!name || !address || !price_per_month || !distance_km || !amenities || !latitude || !longitude) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (typeof name !== 'string' || typeof address !== 'string' || !Array.isArray(amenities)) {
    return res.status(400).json({ message: 'Invalid field types' });
  }
  if (isNaN(price_per_month) || isNaN(distance_km) || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Invalid numeric fields' });
  }
  try {
    await db.query(
      'INSERT INTO hostels (user_id, name, address, price_per_month, distance_km, amenities, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, name, address, parseInt(price_per_month), parseFloat(distance_km), amenities.join(','), parseFloat(latitude), parseFloat(longitude)]
    );
    res.status(201).json({ message: 'Hostel added' });
  } catch (err) {
    console.error('Add hostel error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};