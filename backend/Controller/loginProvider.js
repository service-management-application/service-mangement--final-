const bcrypt = require('bcrypt');
const ProviderModel = require('../model/Provider'); // Renamed to avoid conflict

/**
 * Register a new Provider user.
 */
const registerProvider = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, state, email, password } = req.body;

        // Check if Provider already exists
        const existingProvider = await ProviderModel.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ message: 'Provider already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Provider user
        const newProvider = new ProviderModel({
            firstName,
            lastName,
            phoneNumber,
            state,
            email,
            password: hashedPassword,
        });

        await newProvider.save();
        res.status(201).json({ message: 'Provider registered successfully', newProvider });
    } catch (error) {
        console.error("Error during Provider registration:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * Login a Provider user.
 */
const loginProvider = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find Provider user by email
        const provider = await ProviderModel.findOne({ email });
        if (!provider) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, provider.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', provider });
    } catch (error) {
        console.error("Error during Provider login:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerProvider, loginProvider };