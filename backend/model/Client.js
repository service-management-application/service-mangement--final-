const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    address: {
      type: String,
      required: [true, "adresse is required"],
    },
    phone: {
      type: Number,
      required: [true, "phone is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  });

module.exports = mongoose.model("Users", userSchema); //user name of the table in mongodb