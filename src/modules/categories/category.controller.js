const CategoryService = require('./category.service');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryService.getCategoryById(id);
        res.json(category);
    } catch (error) {
        res.status(error.message === 'Category not found' ? 404 : 500).json({ error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = await CategoryService.createCategory(name, description);
        res.status(201).json({
            message: 'Category successfully created',
            category: newCategory
        });
    } catch (error) {
        res.status(error.message.includes('required') ? 400 : 500).json({ error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await CategoryService.updateCategory(id, name, description);
        res.json({
            message: 'Category successfully updated',
            category: updatedCategory
        });
    } catch (error) {
        res.status(error.message.includes('not found') ? 404 : 
                 error.message.includes('required') ? 400 : 500).json({ error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await CategoryService.deleteCategory(id);
        res.json({ message: 'Category successfully deleted' });
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).json({ error: error.message });
        } else if (error.message.includes('Cannot delete category')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}; 