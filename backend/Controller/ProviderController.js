const bcrypt = require('bcrypt');
const ProviderModel = require('../model/Provider'); // Path to your Provider model
const CategoryModel = require('../model/Category'); // Correct import for Category model

/**
 * Register a new Provider user.
 */
const registerProvider = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, state, email, password, category } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !phoneNumber || !state || !email || !password || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate category
        const categoryExists = await CategoryModel.findById(category); // Use CategoryModel here
        if (!categoryExists) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        // Check if Provider already exists
        const existingProvider = await ProviderModel.findOne({ email });
        if (existingProvider) {
            return res.status(409).json({ message: 'Provider already exists with this email' });
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
            category,
        });

        // Save to database
        await newProvider.save();

        res.status(201).json({ message: 'Provider registered successfully' });
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
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find Provider user by email
        const provider = await ProviderModel.findOne({ email });
        if (!provider) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, provider.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Send success response with limited user data
        res.status(200).json({
            message: 'Login successful',
            provider: {
                id: provider._id,
                firstName: provider.firstName,
                lastName: provider.lastName,
                email: provider.email,
                phoneNumber: provider.phoneNumber,
                category: provider.category,
            },
        });
    } catch (error) {
        console.error("Error during Provider login:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerProvider, loginProvider };
