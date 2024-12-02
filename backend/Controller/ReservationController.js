const Reservation = require("../model/Reservation");
const Provider = require("../model/Provider");
const Client = require("../model/Client");


// Create a new reservation
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



// Get all reservations for a specific client

exports.getClientReservations = async (req, res) => {
    const clientId = req.params.clientId;

    try {
        // Fetch the client by ID
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        // Fetch reservations for the client and populate client and provider fields
        const reservations = await Reservation.find({ client: clientId })
            .populate("client provider");

        return res.status(200).json({ reservations });
    } catch (error) {
        console.error("Error fetching client reservations:", error);
        return res.status(500).json({ message: "Server error" });
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

    const reservations = await Reservation.find({ provider: providerId })
      .populate("client provider");

    return res.status(200).json({ reservations });
  } catch (error) {
    console.error("Error fetching provider reservations:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update a specific reservation
exports.updateReservation = async (req, res) => {
    const { reservationId } = req.params;
    const { status, client, provider, activityDetails } = req.body; // You can update other fields as needed
  
    try {
      // Find the reservation by ID
      const reservation = await Reservation.findById(reservationId);
      
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      // Optionally, check if the provider is the one who is allowed to update the reservation
      if (reservation.provider.toString() !== req.provider.id) {
        return res.status(403).json({ message: 'You are not authorized to update this reservation' });
      }
  
      // Update the reservation fields if provided in the request body
      if (status) reservation.status = status;
      if (client) reservation.client = client; // If the client can be changed
      if (provider) reservation.provider = provider; // If the provider can be changed
      if (activityDetails) reservation.activityDetails = activityDetails;
  
      // Save the updated reservation
      await reservation.save();
  
      return res.status(200).json({ message: 'Reservation updated successfully', reservation });
    } catch (error) {
      console.error('Error updating reservation:', error);
      return res.status(500).json({ message: 'Failed to update reservation', error: error.message });
    }
  };
  
 

// Accept a reservation (change status to APPROVED)
exports.acceptReservation = async (req, res) => {
  const { reservationId } = req.params;
  const { providerId } = req.body;  // Get providerId from request body
  
  try {
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check if the provider is the one who made the reservation
    if (reservation.provider.toString() !== providerId) {
      return res.status(403).json({ message: 'You are not authorized to accept this reservation' });
    }

    // Update the reservation status to APPROVED
    reservation.status = "APPROVED";
    await reservation.save();

    return res.status(200).json({ message: 'Reservation approved', reservation });
  } catch (error) {
    console.error('Error accepting reservation:', error);
    return res.status(500).json({ message: 'Failed to accept reservation', error: error.message });
  }
};

  
  // Reject a reservation (change status to REJECTED)
  exports.rejectReservation = async (req, res) => {
    const { reservationId } = req.params;
  
    try {
      const reservation = await Reservation.findById(reservationId);
  
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      // Check if the provider is the one who made the reservation
      if (reservation.provider.toString() !== req.provider.id) {
        return res.status(403).json({ message: 'You are not authorized to reject this reservation' });
      }
  
      // Update the reservation status to REJECTED
      reservation.status = 'REJECTED';
      await reservation.save();
  
      return res.status(200).json({ message: 'Reservation rejected', reservation });
    } catch (error) {
      console.error('Error rejecting reservation:', error);
      return res.status(500).json({ message: 'Failed to reject reservation', error: error.message });
    }
  };
  
  // Get all reservations (for admins or general use case)
  exports.getAllReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find()
        .populate('provider client'); // Optionally include provider and client details
      return res.status(200).json({ reservations });
    } catch (error) {
      console.error("Error fetching all reservations:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  

// Get a specific reservation by ID
exports.getReservationById = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findById(reservationId)
      .populate('provider client');

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ reservation });
  } catch (error) {
    console.error("Error fetching reservation by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
