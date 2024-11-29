const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ProviderModel = require('../model/Provider');
const CategoryModel = require('../model/Category');

const SECRET_KEY = "0000"; 
/**
 * Middleware: Verify Provider Token
 */
const verifyProvider = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.newProvider = decoded.newProvider; 
    });
};
/**
 * Register a new Provider
 */
const registerProvider = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, state, email, password, category } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !phoneNumber || !state || !email || !password || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate category
        const categoryExists = await CategoryModel.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        // Check if provider already exists
        const existingProvider = await ProviderModel.findOne({ email });
        if (existingProvider) {
            return res.status(409).json({ message: 'Provider already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new provider
        const newProvider = new ProviderModel({
            firstName,
            lastName,
            phoneNumber,
            state,
            email,
            password: hashedPassword,
            category,
        });
        await newProvider.save();

        // Generate a token
        const token = jwt.sign({ id: newProvider._id }, SECRET_KEY, { expiresIn: '1d' });

        res.status(201).json({ message: 'Provider registered successfully', token });
    } catch (error) {
        console.error("Error during Provider registration:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * Login a Provider
 */
const loginProvider = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find provider by email
        const provider = await ProviderModel.findOne({ email });
        if (!provider) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, provider.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a token
        const token = jwt.sign({ id: provider._id }, SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Login successful',
            token,
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



module.exports = { registerProvider, loginProvider, verifyProvider };
