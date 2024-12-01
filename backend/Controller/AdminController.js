const Admin = require("../model/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AdminController = {
  // Register a new admin
  registerAdmin: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new admin
      const newAdmin = new Admin({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await newAdmin.save();

      res
        .status(201)
        .json({ message: "Admin registered successfully!", admin: newAdmin });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },

  // Admin login
  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET || "admin_secret",
        { expiresIn: "1d" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        admin: {
          id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },

  // Get all admins
  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.find();
      res.status(200).json(admins);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },

  // Get an admin by ID
  getAdminById: async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await Admin.findById(id);

      if (!admin) {
        return res.status(404).json({ message: "Admin not found." });
      }

      res.status(200).json(admin);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },

  // Update an admin by ID
  updateAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, password } = req.body;

      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found." });
      }

      let hashedPassword = admin.password;
      if (password) {
        const isPasswordHashed = password.startsWith("$2b$");
        if (!isPasswordHashed) {
          hashedPassword = await bcrypt.hash(password, 10);
        }
      }

      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { firstName, lastName, email, password: hashedPassword },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        message: "Admin updated successfully!",
        admin: updatedAdmin,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },

  // Delete an admin by ID
  deleteAdmin: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedAdmin = await Admin.findByIdAndDelete(id);
      if (!deletedAdmin) {
        return res.status(404).json({ message: "Admin not found." });
      }

      res.status(200).json({ message: "Admin deleted successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  },
};

module.exports = AdminController;
