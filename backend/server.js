require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const ClientRoutes = require("./routes/Client");
const ProviderRoutes = require("./routes/Provider");
const CategoryRoutes = require("./routes/CategoryRoutes");
const ServiceRoutes = require("./routes/ServiceRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const ReservationRoutes = require("./routes/ReservationRoutes");
const ReservationServiceRoutes = require("./routes/ReservationServiceRoute");

const corsOptions = {
  origin: "https://service-mangement-rjt8.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clients", ClientRoutes);
app.use("/providers", ProviderRoutes);
app.use("/categories", CategoryRoutes);
app.use("/services", ServiceRoutes);
app.use("/admins", AdminRoutes);
app.use("/reservations", ReservationRoutes);
app.use("/reservationservices", ReservationServiceRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });

app.options("*", cors(corsOptions));
