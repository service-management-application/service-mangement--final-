const express = require('express');
const router = express.Router();
const ClientController = require('../Controller/ClientController');

// Define routes
router.post('/register', ClientController.registerClient); // Register a client
router.post('/login', ClientController.loginClient);       // Login a client
router.get('/getall', ClientController.getAllClients);     // Get all clients
router.get('/get/:id', ClientController.getClientById);    // Get a single client by ID
router.put('/update/:id', ClientController.updateClient);  // Update a client by ID
router.delete('/delete/:id', ClientController.deleteClient); // Delete a client by ID

module.exports = router;
