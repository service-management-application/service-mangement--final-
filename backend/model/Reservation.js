const mongoose = require("mongoose");

// Schéma de réservation
const ReservationSchema = new mongoose.Schema({
  client: { // Correction du champ pour correspondre à la logique
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Le modèle pour les utilisateurs
    required: true,
  },
  provider: { // Correction du champ pour correspondre à la logique
    type: mongoose.Schema.Types.ObjectId,
    ref: 'prest', // Le modèle pour les prestataires
    required: true,
  },
  activityDetails: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING', // Default status is PENDING
  },
}, {
  timestamps: true, // Ajout des champs createdAt et updatedAt automatiquement
});

module.exports = mongoose.model("Reservation", ReservationSchema);