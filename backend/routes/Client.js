const express = require('express');
const { registerClient, loginClient } = require('../Controller/ClientController');
const router = express.Router();

// Register route
router.post('/register', registerClient);

// Login route
router.post('/login', loginClient);

module.exports = router;