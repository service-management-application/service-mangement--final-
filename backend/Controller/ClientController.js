const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ClientModel = require('../model/Client');


// Middleware to verify the JWT token
const verifyUser = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token error!' });
  }
  jwt.verify(token, "0000", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Auth error!' });
    } else {
      req.newClient = decoded.newClient;
      next();
    }
  });
};

// Register Client
const registerClient = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if Client already exists
    const existingClient = await ClientModel.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new Client
    const newClient = new ClientModel({ firstName, lastName, email, password: hashedPassword });
    const token = jwt.sign({ newClient }, "0000", { expiresIn: '1d' });
    await newClient.save();

    // Return the token and success message
    res.status(201).json({ message: 'Client registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering Client', error });
  }
};

// Login Client
const loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await ClientModel.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ newClient: client }, "0000", { expiresIn: '1d' });

    // Return the token and client data
    res.status(200).json({ message: "Success", token, newClient: client });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in Client', error });
  }
};

// Logout Client
const logoutClient = (req, res) => {
  res.json({ message: 'logged out' });
};

module.exports = { verifyUser, registerClient, loginClient, logoutClient };
