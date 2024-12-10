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

    // Ensure the Service exists and retrieve the client ID
    const service = await Service.findById(serviceId).populate("Client");
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    // Ensure the Provider exists
    const providerExists = await Provider.findById(providerId);
    if (!providerExists) {
      return res.status(404).json({ message: "Provider not found." });
    }

    // Extract the client ID from the Service document
    const clientId = service.Client._id;

    // Create and save the new reservation
    const newReservation = new ReservationService({
      Service: serviceId,
      provider: providerId,
      client: clientId, 
    });

    const savedReservation = await newReservation.save();

    // Fetch all reservations for the client
    const clientReservations = await ReservationService.find({ client: clientId })
      .populate("Service", "name description price")
      .populate("provider", "name email");

    return res.status(201).json({
      message: "Reservation created successfully.",
      reservation: savedReservation,
      clientReservations, // Return all client reservations
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await ReservationService.find()
      .populate("Service", "name description price") 
      .populate("provider", "name email");

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
      const provider = await Provider.findById(providerId);
      if (!provider) {
          return res.status(404).json({ message: "Provider not found" });
      }

      const reservations = await ReservationService.find({ provider: providerId })
          .populate({
              path: "Service",
              select: "title description price",
              populate: {
                  path: "Client",
                  select: "firstName lastName email"
              }
          })
          .populate("provider", "email");

      return res.status(200).json({ reservations });
  } catch (error) {
      console.error("Error fetching provider reservations:", error);
      return res.status(500).json({ message: "Server error" });
  }
};

// Get reservations by clientId 
exports.getReservationsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const reservations = await ReservationService.find({ client: clientId })
      .populate({
        path: 'Service',
        select: 'title description price',
        populate: { path: 'Client', select: 'firstName lastName email' }
      })
      .populate('provider', 'firstName phoneNumber')
      .populate('Service', 'title description');

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found for this client." });
    }

    return res.status(200).json({ reservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ message: "Error fetching reservations.", error: error.message });
  }
};

// Get a specific reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;

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

    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const updatedReservation = await ReservationService.findByIdAndUpdate(
      id,
      { status },
      { new: true }
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
