const Category = require('../models/Category');

exports.listCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.json(categories);
    } catch (error) {
        console.error('Error in listCategories:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        const category = await Category.create({ name, color, user: req.user.id });
        res.json(category);
    } catch (error) {
        console.error('Error in createCategory:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, { name, color }, { new: true });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error('Error in updateCategory:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const result = await Category.deleteOne({ _id: req.params.id, user: req.user.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Error in deleteCategory:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
