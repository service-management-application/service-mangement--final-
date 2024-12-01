const express = require("express");
const router = express.Router();
const AdminController = require("../Controller/AdminController");

// Define routes for admin operations
router.post("/register", AdminController.registerAdmin); // Register an admin
router.post("/login", AdminController.loginAdmin);       // Login an admin
router.get("/getall", AdminController.getAllAdmins);     // Get all admins
router.get("/get/:id", AdminController.getAdminById);    // Get an admin by ID
router.put("/update/:id", AdminController.updateAdmin);  // Update an admin by ID
router.delete("/delete/:id", AdminController.deleteAdmin); // Delete an admin by ID

module.exports = router;
