// routes/reservation.routes.js
const express = require('express');
const router = express.Router();
const ReservationController = require('../Controller/ReservationController');

// Create a new reservation
router.post("/Create", ReservationController.createReservation);

// Get all reservations (admin or general use case)
router.get('/', ReservationController.getAllReservations);

// Get all reservations for a specific client
router.get('/client', ReservationController.getClientReservations);

// Get all reservations for a specific provider
router.get('/provider/:providerId', ReservationController.getProviderReservations);

// Get a specific reservation by ID
router.get('/:reservationId', ReservationController.getReservationById);

module.exports = router;
