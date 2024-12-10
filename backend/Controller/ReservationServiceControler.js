const ReservationService = require("../model/ReservationService");
const Provider = require("../model/Provider");
const Service = require("../model/Service");

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const { Service: serviceId, provider: providerId } = req.body;

    // Validate required fields
    if (!serviceId || !providerId) {
      return res.status(400).json({ message: "Service and provider are required." });
    }

    // Ensure the Service and Provider exist
    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
      return res.status(404).json({ message: "Service not found." });
    }

    const providerExists = await Provider.findById(providerId);
    if (!providerExists) {
      return res.status(404).json({ message: "Provider not found." });
    }

    // Create and save the new reservation
    const newReservation = new ReservationService({
      Service: serviceId,
      provider: providerId,
    });

    const savedReservation = await newReservation.save();
    return res.status(201).json({ message: "Reservation created successfully.", reservation: savedReservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await ReservationService.find()
      .populate("Service", "name description price") // Adjust fields to include only necessary details
      .populate("provider", "name email"); // Adjust fields for providers

    return res.status(200).json({ reservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Get all reservations for a specific provider
exports.getProviderReservations = async (req, res) => {
  const providerId = req.params.providerId;

  try {
      // Ensure the provider exists in the database
      const provider = await Provider.findById(providerId);
      if (!provider) {
          return res.status(404).json({ message: "Provider not found" });
      }

      // Fetch reservations and populate the necessary fields
      const reservations = await ReservationService.find({ provider: providerId })
          .populate({
              path: "Service",
              select: "title description price", // Select service details
              populate: {
                  path: "Client", // Populate the Client field within Service
                  select: "firstName lastName email" // Select client details
              }
          })
          .populate("provider", "email"); // Populate provider's email

      // Return the reservations with the populated data
      return res.status(200).json({ reservations });
  } catch (error) {
      console.error("Error fetching provider reservations:", error);
      return res.status(500).json({ message: "Server error" });
  }
};


// Update reservation status
exports.updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body; // APPROVED or REJECTED

    if (!["APPROVED", "REJECTED" , "PENDING"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const reservation = await ReservationService.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    res.status(200).json({ message: `Reservation ${status}.`, reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating reservation status." });
  }
};


// Get reservations by clientId 
exports.getReservationsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Directly filter reservations based on the Service's Client field
    const reservations = await ReservationService.find()
      .populate({
        path: 'Service',
        populate: { path: 'Client', select: 'firstName lastName email' }, // Populate Client details
      })
      .populate('provider', 'firstName phoneNumber') // Populate provider details
      .populate('Service', 'title description'); // Populate specific fields from Service

    // Filter reservations where the Service's Client matches the clientId
    const filteredReservations = reservations.filter(
      (reservation) => reservation.Service && reservation.Service.Client && reservation.Service.Client._id.toString() === clientId
    );

    if (filteredReservations.length === 0) {
      return res.status(404).json({ message: "No reservations found for this client." });
    }

    return res.status(200).json({ reservations: filteredReservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ message: "Error fetching reservations.", error: error.message });
  }
};
/**
 * exports.getReservationsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Fetch reservations where the client ID matches in the nested Service.Client
    const reservations = await ReservationService.find()
      .populate({
        path: 'Service',
        match: { Client: clientId }, // Filter by Client ID in the populated Service
        populate: { path: 'Client', select: 'firstName lastName email' }, // Populate Client details if needed
      })
      .populate('provider', 'firstName phoneNumber') // Populate provider details
      .populate('Service', 'title description');// Populate specific fields from Service

      // Filter out any reservations where the Service does not match the client ID
    const filteredReservations = reservations.filter((reservation) => reservation.Service);

    if (filteredReservations.length === 0) {
      return res.status(404).json({ message: "No reservations found for this client." });
    }

    return res.status(200).json({ reservations: filteredReservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ message: "Error fetching reservations.", error: error.message });
  }
};
 */


// Get a specific reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch reservation with populated references
    const reservation = await ReservationService.findById(id)
      .populate("Service", "name description price")
      .populate("provider", "name email");

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    return res.status(200).json({ reservation });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Update a reservation's status
exports.updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("Status received:", status);
    console.log("Full Request Body:", req.body); // Log the entire request body

    // Validate the new status
    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: "Invalid status.", receivedStatus: status });
    }

    // Update reservation status
    const updatedReservation = await ReservationService.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    return res.status(200).json({ message: "Reservation status updated.", reservation: updatedReservation });
  } catch (error) {
    console.error("Error updating reservation status:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete reservation by ID
    const deletedReservation = await ReservationService.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    return res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};
