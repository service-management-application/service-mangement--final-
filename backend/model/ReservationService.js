const mongoose = require("mongoose");

const ReservationServiceSchema = new mongoose.Schema({
  Service: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service', 
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'prest', 
    required: true,
  },
  client: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model("ReservationService", ReservationServiceSchema);
