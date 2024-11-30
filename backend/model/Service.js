const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  Client: {
    type: mongoose.Schema.Types.ObjectId,// establishes a relationship between the Service and Client models.
    ref: 'Users', // This tells Mongoose to use the Client model
    required: true
},
  
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
