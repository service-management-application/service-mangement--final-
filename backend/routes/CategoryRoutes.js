const express = require('express');
const router = express.Router();
const CategoryController = require('../Controller/CategoryController');

// Define routes
router.post('/create', CategoryController.createCategory); // No /categories here
router.get('/getall', CategoryController.getAllCategories);
router.get('/get/:id', CategoryController.getCategoryById);
router.put('/update/:id', CategoryController.updateCategory);
router.delete('/delete/:id', CategoryController.deleteCategory);

module.exports = router;
