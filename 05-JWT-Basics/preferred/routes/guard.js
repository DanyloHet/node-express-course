const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { hello } = require('../controllers/guardController');

router.get('/', authenticateToken, hello);

module.exports = router;
