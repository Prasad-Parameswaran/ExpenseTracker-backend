const mongoose = require('mongoose');
const budgetSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    month: String, // 'YYYY-MM'
    limit: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Budget', budgetSchema);
