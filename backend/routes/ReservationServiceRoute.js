const express = require("express");
const router = express.Router();
const ReservationServController = require('../Controller/ReservationServiceControler');

// Create a reservation
router.post("/create", ReservationServController.createReservation);

// Get all reservations
router.get("/", ReservationServController.getReservations);

// Get a specific reservation by ID
router.get("/:id", ReservationServController.getReservationById);

// Get all reservations for a specific provider
router.get("/provider/:providerId", ReservationServController.getProviderReservations);

// Get reservations by clientId
router.get("/reservations/client/:clientId", ReservationServController.getReservationsByClient);

// Update a reservation's status
router.patch("/:id", ReservationServController.updateReservationStatus);

// Delete a reservation
router.delete("/:id", ReservationServController.deleteReservation);

// Update reservation status (Accept and Reject) 
router.patch('/reservations/:id/status', ReservationServController.updateReservationStatus);

// Check if the reservation is already reserved
router.get('/check-reservation/:serviceId', ReservationServController.checkReservation);







  
module.exports = router;
