const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // This tells Mongoose to use the Category model
        required: true
    }

});

module.exports = mongoose.model('Category', CategorySchema);