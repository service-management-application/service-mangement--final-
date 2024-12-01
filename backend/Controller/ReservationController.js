const Reservation = require("../model/Reservation");
const Provider = require("../model/Provider");


exports.createReservation = async (req, res) => {
  console.log('Request Body:', req.body); // Debug log
  
  try {
    const { client, provider, activityDetails } = req.body;

    // Vérification des champs requis
    if (!client || !provider || !activityDetails) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Création de la réservation
    const newReservation = new Reservation({
      client,
      provider,
      activityDetails,
    });

    await newReservation.save();

    return res.status(201).json({ message: 'Reservation created successfully.', reservation: newReservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return res.status(500).json({ message: 'Failed to create reservation.', error: error.message });
  }
};

  
  

// Get all reservations (admin or general use case)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('Provider Client'); // Optionally include provider and client details
    return res.status(200).json({ reservations });
  } catch (error) {
    console.error("Error fetching all reservations:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all reservations for a specific client
exports.getClientReservations = async (req, res) => {
  const clientId = req.client.id;

  try {
    const reservations = await Reservation.find({ Client: clientId })
      .populate('Provider');
    return res.status(200).json({ reservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all reservations for a specific provider
exports.getProviderReservations = async (req, res) => {
    const providerId = req.params.providerId; // Assuming providerId is passed as a URL parameter
  
    try {
      // Check if the provider exists
      const provider = await Provider.findById(providerId);
      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }
  
      // Get reservations for the specific provider
      const reservations = await Reservation.find({ provider: providerId })
        .populate("client") // Populate client details
        .populate("provider"); // Optionally populate provider details
  
      return res.status(200).json({ reservations });
    } catch (error) {
      console.error("Error fetching provider reservations:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }; 
  
// Get a specific reservation by ID
exports.getReservationById = async (req, res) => {
  const { reservationId } = req.params;

  try {
    // Check if the reservation exists
    const reservation = await Reservation.findById(reservationId)
      .populate('Provider Client');
    
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ reservation });
  } catch (error) {
    console.error("Error fetching reservation by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
