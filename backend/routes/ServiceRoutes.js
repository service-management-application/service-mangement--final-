const express = require("express");
const router = express.Router();
const serviceController = require("../Controller/ServiceController");

// Create a new service
router.post("/Create", serviceController.createService);

// Get all services
router.get("/getall", serviceController.getAllServices);

// Get a single service by ID
router.get("/:id", serviceController.getServiceById);

// Update a service
router.put("/:id", serviceController.updateService);

// Delete a service
router.delete("/:id", serviceController.deleteService);
// get service by client id
router.get("/client/:clientId", serviceController.getServicesByClientId);


module.exports = router;
