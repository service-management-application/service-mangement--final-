const Service = require("../model/Service");
const ClientModel = require('../model/Client');

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { Client, title, date, description ,state , price } = req.body;

    // Validate required fields
    if (!Client || !title || !date || !description || !state || !price ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate Client ID
    const clientExists = await ClientModel.findById(Client);
    if (!clientExists) {
      return res.status(400).json({ message: "Client not found" });
    }

    // Create and save the service
    const service = new Service({ Client, title, date, description ,state , price});
    await service.save();

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Error in createService:", error);
    res.status(500).json({ message: "Failed to create service", error: error.message });
  }
};


// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("Client");
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve services", error: error.message });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("Client");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve service", error: error.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const { Client, title, date, description,state , price } = req.body;

    // Validate required fields
    if (Client && !title && !date && !description && !state && !price ) {
      return res.status(400).json({ message: "At least one field must be updated" });
    }

    // Validate Client ID if provided
    if (Client) {
      const clientExists = await ClientModel.findById(Client);
      if (!clientExists) {
        return res.status(400).json({ message: "Client not found" });
      }
    }

    // Update the service
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { Client, title, date, description ,state , price },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update service", error: error.message });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete service", error: error.message });
  }
};

exports.getServicesByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Log the clientId to ensure it's correct
    console.log("Client ID received:", clientId);

    // Find services by the client ID
    const services = await Service.find({ Client: clientId }).populate("Client");

    // Log the services to see if any are returned
    console.log("Services found:", services);

    if (services.length === 0) {
      return res.status(404).json({ message: "No services found for this client" });
    }

    res.status(200).json(services);  // Send back the services
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve services for client", error: error.message });
  }
};

