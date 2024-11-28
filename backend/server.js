require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

//importing routes
const authRoutes = require('./routes/Client'); 
const ProviderRoutes = require('./routes/Provider');
const categoryRoutes = require('./routes/CategoryRoutes');


const cookieParser = require('cookie-parser');

const app=express();
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow cookies and credentials // Allow only GET and POST methods
  allowedHeaders: ['Content-Type'], // Allow Content-Type header
};

app.use(cors(corsOptions)); 
app.use(express.json());
app.use(cookieParser());
app.use('/authClient',authRoutes); //to test : http localhost 4000/authClient
app.use('/authProvider',ProviderRoutes);
app.use('/categories', categoryRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to database!");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });