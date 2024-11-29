const Service = require("../model/Service");
const ClientModel = require('../model/Client');

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { Client, title, date, description } = req.body;

    // Validate required fields
    if (!Client || !title || !date || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate Client ID
    const clientExists = await ClientModel.findById(Client);
    if (!clientExists) {
      return res.status(400).json({ message: "Client not found" });
    }

    // Create and save service
    const service = new Service({ Client, title, date, description });
    await service.save();
    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    console.error(error);
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
    const { Client, title, date, description } = req.body;

    // Validate required fields
    if (Client && !title && !date && !description) {
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
      { Client, title, date, description },
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
