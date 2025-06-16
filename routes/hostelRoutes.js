const express = require('express');
const router = express.Router();
const hostelController = require('../controllers/hostelController');
const authMiddleware = require('../middleware/auth');

router.get('/', hostelController.getHostels);
router.post('/', authMiddleware, hostelController.addHostel);

module.exports = router;