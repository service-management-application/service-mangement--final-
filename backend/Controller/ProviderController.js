const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProviderModel = require("../model/Provider");
const CategoryModel = require("../model/Category");

const SECRET_KEY = "0000";

// Register a new provider
const registerProvider = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      state,
      email,
      password,
      category,
      price, // Optional field
      activity_description,
    } = req.body;

    // Validate required fields (removed price)
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !state ||
      !email ||
      !password ||
      !category ||
      !activity_description
    ) {
      return res.status(400).json({ message: "All fields except price are required." });
    }

    // Validate category
    const categoryExists = await CategoryModel.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    // Check if provider already exists
    const existingProvider = await ProviderModel.findOne({ email });
    if (existingProvider) {
      return res.status(409).json({ message: "Provider already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new provider with price being optional
    const newProvider = new ProviderModel({
      firstName,
      lastName,
      phoneNumber,
      state,
      email,
      password: hashedPassword,
      category,
      price: price || null, // Set price to null if not provided
      activity_description,
    });
    await newProvider.save();

    res.status(201).json(newProvider); // Return the created provider
  } catch (error) {
    console.error("Error during provider registration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login a provider
const loginProvider = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find provider by email
    const provider = await ProviderModel.findOne({ email });
    if (!provider) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, provider.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ id: provider._id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      provider: {
        id: provider._id,
        firstName: provider.firstName,
        lastName: provider.lastName,
        email: provider.email,
        state: provider.state,
        phoneNumber: provider.phoneNumber,
        category: provider.category,
        price: provider.price,
        activity_description: provider.activity_description,
      },
    });
  } catch (error) {
    console.error("Error during Provider login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all providers
const getAllProviders = async (req, res) => {
  try {
    const providers = await ProviderModel.find().populate("category");
    res.status(200).json(providers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

// Get a provider by ID
const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await ProviderModel.findById(id).populate("category");

    if (!provider) {
      return res.status(404).json({ message: "Provider not found." });
    }

    res.status(200).json(provider);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

// Update provider
const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      state,
      password,
      category,
      price, // Optional field
      activity_description,
    } = req.body;

    // Find provider
    const provider = await ProviderModel.findById(id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found." });
    }

    // Check if password is provided and hash if necessary
    let hashedPassword;
    if (password) {
      const isPasswordHashed = password.startsWith("$2b$");
      if (!isPasswordHashed) {
        hashedPassword = await bcrypt.hash(password, 10);
      } else {
        hashedPassword = password;
      }
    }

    // Update provider
    const updatedData = {
      firstName,
      lastName,
      phoneNumber,
      state,
      email,
      category,
      price: price !== undefined ? price : provider.price, // Keep old price if not provided
      activity_description,
    };
    if (hashedPassword) updatedData.password = hashedPassword;

    const updatedProvider = await ProviderModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );
    if (!updatedProvider) {
      return res.status(404).json({ message: "Provider update failed." });
    }

    res.status(200).json({
      message: "Provider updated successfully.",
      provider: updatedProvider,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

// Delete a provider by ID
const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProvider = await ProviderModel.findByIdAndDelete(id);
    if (!deletedProvider) {
      return res.status(404).json({ message: "Provider not found." });
    }

    res.status(200).json({ message: "Provider deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

// Get providers by category
const getProvidersByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const providers = await ProviderModel.find({ category: categoryId }).populate("category", "title");

    if (providers.length === 0) {
      return res.status(404).json({ message: "No providers found in this category" });
    }

    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerProvider,
  loginProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
  getProvidersByCategory,
};
