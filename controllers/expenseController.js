const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

exports.listExpenses = async (req, res) => {
    try {
        const { month } = req.query;
        const start = new Date(`${month}-01`);
        const end = new Date(`${month}-31`);
        const expenses = await Expense.find({
            user: req.user.id, date: { $gte: start, $lte: end }
        }).populate('category');
        res.json(expenses);
    } catch (error) {
        console.error('Error in listExpenses:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createExpense = async (req, res) => {
    try {
        const { category, amount, date } = req.body;
        const expense = await Expense.create({ user: req.user.id, category, amount, date });
        const month = date.slice(0, 7);
        const spent = await Expense.aggregate([
            { $match: { user: req.user.id, category: category, date: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-32`) } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const budget = await Budget.findOne({ user: req.user.id, category, month });
        const overBudget = budget && spent[0]?.total > budget.limit;
        res.json({ expense, status: overBudget ? 'over' : 'within' });
    } catch (error) {
        console.error('Error in createExpense:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
