const Category = require('../model/Category'); // Adjust the path to your model if necessary

const CategoryController = {
    // Create a new category
    createCategory: async (req, res) => {
        try {
            const { title, description } = req.body;
            
            // Validate required fields
            if (!title || !description ) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const newCategory = new Category({ title, description});
            await newCategory.save();

            res.status(201).json({ message: 'Category created successfully!', category: newCategory });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    },

    // Get all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    },

    // Get a single category by ID
    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findById(id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found.' });
            }

            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    },

    // Update a category by ID
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description} = req.body;

            const updatedCategory = await Category.findByIdAndUpdate(
                id,
                { title, description},
                { new: true, runValidators: true } // Return the updated document and validate fields
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found.' });
            }

            res.status(200).json({ message: 'Category updated successfully!', category: updatedCategory });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    },

    // Delete a category by ID
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedCategory = await Category.findByIdAndDelete(id);

            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found.' });
            }

            res.status(200).json({ message: 'Category deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    },
};
module.exports = CategoryController;
