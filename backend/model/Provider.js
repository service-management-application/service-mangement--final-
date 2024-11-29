const mongoose = require('mongoose');

// Define the Prest schema (service providers)
const prestSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures email is unique
    },
    password: {
        type: String,
        required: true
    },
    // Reference to the Category model using ObjectId
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // This tells Mongoose to use the Category model
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('prest', prestSchema);