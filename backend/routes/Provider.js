const express = require('express');
const router = express.Router();
const ProviderController = require('../Controller/ProviderController');

// Define routes for provider
router.post('/register', ProviderController.registerProvider); // Register a provider
router.post('/login', ProviderController.loginProvider);       // Login a provider
router.get('/getall', ProviderController.getAllProviders);     // Get all providers
router.get('/get/:id', ProviderController.getProviderById);    // Get a provider by ID
router.put('/update/:id', ProviderController.updateProvider);  // Update a provider by ID
router.delete('/delete/:id', ProviderController.deleteProvider); // Delete a provider by ID

module.exports = router;
