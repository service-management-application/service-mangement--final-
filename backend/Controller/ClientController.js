const Client = require("../model/Client"); // Adjust the path to your model if necessary
const Service = require("../model/Service");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const ClientController = {
  // Register a new client
  registerClient: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        return res.status(400).json({ message: "Client already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newClient = new Client({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await newClient.save();

      const token = jwt.sign(
        { clientId: newClient._id },
        process.env.JWT_SECRET || "0000",
        { expiresIn: "1d" }
      );
      res
        .status(201)
        .json({ message: "Client registered successfully!", token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },

  // Login a client
  loginClient: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Validate required fields
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Find client by email
      const client = await Client.findOne({ email });
      if (!client) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, client.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate a token
      const token = jwt.sign(
        { id: client._id },
        process.env.JWT_SECRET || "0000",
        { expiresIn: "1d" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        client: {
          id: client._id,
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
        },
      });
    } catch (error) {
      console.error("Error during Client login:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Get all clients
  getAllClients: async (req, res) => {
    try {
      const clients = await Client.find();
      res.status(200).json(clients);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },

  // Get a single client by ID
  getClientById: async (req, res) => {
    try {
      const { id } = req.params;
      const client = await Client.findById(id);

      if (!client) {
        return res.status(404).json({ message: "Client not found." });
      }

      res.status(200).json(client);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },

  // Update a client by ID
  updateClient: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, password } = req.body;

      // Find the client in the database
      const client = await Client.findById(id);
      if (!client) {
        return res.status(404).json({ message: "Client not found." });
      }

      // Check if password is provided and if it's already hashed
      let hashedPassword;
      if (password) {
        // Compare provided password with the stored hashed password
        const isPasswordHashed = password.startsWith("$2b$"); // bcrypt hashes start with '$2b$'
        if (!isPasswordHashed) {
          // Hash the password if it's not already hashed
          hashedPassword = await bcrypt.hash(password, 10);
        } else {
          // Use the provided password if it's already hashed (no re-hashing)
          hashedPassword = password;
        }
      }

      // Prepare updated data
      const updatedData = { firstName, lastName, email };
      if (hashedPassword) {
        updatedData.password = hashedPassword; // Only include password if it's new or updated
      }

      // Update client
      const updatedClient = await Client.findByIdAndUpdate(
        id,
        updatedData,
        { new: true, runValidators: true } // Return updated document and validate fields
      );

      if (!updatedClient) {
        return res.status(404).json({ message: "Client update failed." });
      }

      res
        .status(200)
        .json({
          message: "Client updated successfully!",
          client: updatedClient,
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },

  // Delete a client by ID
  deleteClient: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the client exists
      const client = await Client.findById(id);
      if (!client) {
        return res.status(404).json({ message: "Client not found." });
      }

      // Delete all services associated with the client
      await Service.deleteMany({ Client: id });

      // Delete the client
      await Client.findByIdAndDelete(id);

      res.status(200).json({ message: "Client and associated services deleted successfully!" });
    } catch (error) {
      console.error("Error in deleteClient:", error);
      res
        .status(500)
        .json({ message: "Internal server error while deleting client.", error: error.message });
    }
  },
};


module.exports = ClientController;
