
const express = require('express');
const authRoutes = require('./authRoutes');
const eventRoutes = require('./eventRoutes');

const router = express.Router(); // Create the router instance

// Use the routes
router.use('/auth', authRoutes); 
router.use('/events', eventRoutes); 

module.exports = router; // Export the router
