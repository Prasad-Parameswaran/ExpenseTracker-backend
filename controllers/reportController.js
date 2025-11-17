const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const Category = require('../models/Category');

exports.monthlyReport = async (req, res) => {
    try {
        const { month } = req.query;
        console.log(req.query, 'hhhhhhhhhhhhhh1111');

        const start = new Date(`${month}-01`);
        const end = new Date(start);
        end.setMonth(end.getMonth() + 1); // end of selected month

        const categories = await Category.find({ user: req.user.id });

        const expenses = await Expense.find({
            user: req.user.id,
            date: { $gte: start, $lt: end }
        });

        const budgets = await Budget.find({ user: req.user.id, month });

        const report = categories.map(cat => {
            const catBudget = budgets.find(b => b.category.toString() === cat._id.toString());
            const spent = expenses
                .filter(e => e.category.toString() === cat._id.toString())
                .reduce((acc, e) => acc + e.amount, 0);

            return {
                category: cat.name,
                color: cat.color,
                spent,
                budget: catBudget?.limit || 0,
                remaining: (catBudget?.limit || 0) - spent
            };
        });

        res.json(report);
    } catch (error) {
        console.error('Error in monthlyReport:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
