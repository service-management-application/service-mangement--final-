require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

// Importing routes
const ClientRoutes = require("./routes/Client");
const ProviderRoutes = require("./routes/Provider");
const CategoryRoutes = require("./routes/CategoryRoutes");
const ServiceRoutes = require("./routes/ServiceRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const ReservationRoutes = require("./routes/ReservationRoutes");
const ReservationServiceRoutes = require("./routes/ReservationServiceRoute");


// CORS configuratio
/*const corsOptions = {
  origin: "https://service-mangement-final.onrender.com", // Allow requests from this origin
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow Content-Type and Authorization headers
};
app.use(cors(corsOptions));*/
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/clients", ClientRoutes);
app.use("/providers", ProviderRoutes);
app.use("/categories", CategoryRoutes);
app.use("/services", ServiceRoutes);
app.use("/admins", AdminRoutes);
app.use("/reservations", ReservationRoutes);
app.use("/reservationservices", ReservationServiceRoutes);

// MongoDB connection

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

/*
const startServer = async () => {
  try {
    // Ensure `process.env.MONGODB_URI` and `process.env.PORT` are set in your `.env` file
    if (!process.env.MONGODB_URI || !process.env.PORT) {
      throw new Error("Missing required environment variables in .env file.");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to database!");

    // Start the server
    const port = process.env.PORT || 5000; // Default to port 5000 if not specified
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
*/

