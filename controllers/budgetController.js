const Budget = require('../models/Budget');

exports.listBudgets = async (req, res) => {
    try {
        const { month } = req.query;
        const budgets = await Budget.find({ user: req.user.id, month });
        res.json(budgets);
    } catch (error) {
        console.error('Error in listBudgets:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createBudget = async (req, res) => {
    try {
        const { category, month, limit } = req.body;
        console.log(req.body, 'here is limit')
        const budget = await Budget.create({ user: req.user.id, category, month, limit });
        res.json(budget);
    } catch (error) {
        console.error('Error in createBudget:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateBudget = async (req, res) => {
    try {
        const { limit } = req.body;
        const budget = await Budget.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, { limit }, { new: true });
        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }
        res.json(budget);
    } catch (error) {
        console.error('Error in updateBudget:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteBudget = async (req, res) => {
    try {
        const result = await Budget.deleteOne({ _id: req.params.id, user: req.user.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Budget not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Error in deleteBudget:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
